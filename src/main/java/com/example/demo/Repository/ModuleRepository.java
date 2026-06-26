package com.example.demo.Repository;

import com.example.demo.Entity.Module;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ModuleRepository
        extends JpaRepository<Module, Long> {

    Optional<Module> findByModuleName(
            String moduleName
    );

}