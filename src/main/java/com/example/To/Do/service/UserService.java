package com.example.To.Do.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.To.Do.dto.LoginRequestDTO;
import com.example.To.Do.dto.UserRequestDTO;
import com.example.To.Do.dto.UserResponseDTO;
import com.example.To.Do.dto.UserUpdateDTO;
import com.example.To.Do.entity.User;
import com.example.To.Do.exceptions.ResourceNotFoundException;
import com.example.To.Do.mapper.DtoMapper;
import com.example.To.Do.repository.UserRepository;
import com.example.To.Do.utils.PasswordEncoder;

import lombok.Data;

@Service
@Data
public class UserService {
    private final UserRepository userRepository;
    private final DtoMapper dtoMapper;
    private final PasswordEncoder passwordEncoder;

    public UserResponseDTO createUser(UserRequestDTO requestDTO) {
        if (userRepository.findByUsername(requestDTO.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (userRepository.findByEmail(requestDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = dtoMapper.toUserEntity(requestDTO);
        user.setPassword(passwordEncoder.encodePassword(requestDTO.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        return dtoMapper.toUserResponseDTOWithoutTodos(userRepository.save(user));
    }

    public UserResponseDTO login(LoginRequestDTO loginRequestDTO) {
        User user = userRepository.findByUsername(loginRequestDTO.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));
        
        if (!passwordEncoder.matchesPassword(loginRequestDTO.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        return dtoMapper.toUserResponseDTOWithoutTodos(user);
    }

    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return dtoMapper.toUserResponseDTO(user);
    }

    public List<UserResponseDTO> getAllUsers() {
        return dtoMapper.toUserResponseDTOList(userRepository.findAll());
    }

    public UserResponseDTO updateUser(Long id, UserUpdateDTO updateDTO) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        dtoMapper.updateUserFromDto(updateDTO, existingUser);
        if (updateDTO.getPassword() != null && !updateDTO.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encodePassword(updateDTO.getPassword()));
        }
        return dtoMapper.toUserResponseDTOWithoutTodos(userRepository.save(existingUser));
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
}
