package com.etms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.etms.pojos.Modules;

public interface ModuleRepository extends JpaRepository<Modules,Long> {

	Optional<Modules> findByModuleName(String moduleName);

}
