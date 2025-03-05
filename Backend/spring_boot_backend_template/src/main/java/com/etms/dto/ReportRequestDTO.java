package com.etms.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReportRequestDTO {
    private String course;
    private String module;
    private String faculty;

    // Getters and Setters
}
