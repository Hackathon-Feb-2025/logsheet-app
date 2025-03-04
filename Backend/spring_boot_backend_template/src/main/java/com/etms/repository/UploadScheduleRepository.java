package com.etms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.etms.pojos.UploadScheduleFile;

public interface UploadScheduleRepository extends JpaRepository<UploadScheduleFile,Long> {

}
