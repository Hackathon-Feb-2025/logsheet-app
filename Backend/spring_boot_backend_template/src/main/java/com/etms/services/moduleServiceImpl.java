package com.etms.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.etms.pojos.Courses;
import com.etms.pojos.Modules;
import com.etms.repository.CourseRepository;
import com.etms.repository.ModuleRepository;

@Service
public class moduleServiceImpl  {

    private static final String UPLOAD_DIR = "D:/Practice/Hackthon/files/";
    
    // Ensure this directory exists
    @Autowired
    private CourseRepository courserepo;
    @Autowired
    private ModuleRepository modulerepo;
    @Autowired
    ModelMapper mapper;

    
    public Modules saveModule(Long courseId, String moduleName, MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("File is empty");
        }

        // Ensure the directory exists
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdirs(); // Create if it doesn't exist
        }

        // Save file to the specified directory
        Path filePath = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
        System.out.println(file.getOriginalFilename());
        Files.copy(file.getInputStream(), filePath);

        System.out.println("File saved at: " + filePath.toAbsolutePath());

        // Here, you should save the file path in the database along with courseId and moduleName
        Modules modules = new Modules();
        System.out.println("in service");
        Courses c = courserepo.findById(courseId)
                .orElseThrow(() -> new IOException("Course not found with ID: " + courseId));
       modules.setCourse(c);
        modules.setModuleName(moduleName);
        modules.setCurriculumFilePath(filePath.toString());
        System.out.println(modules);
        // Assuming Modules has a filePath field

        // Save module in the database (you need a repository for this)
       Modules m1=modulerepo.save(modules);

        return m1;
    }
}
