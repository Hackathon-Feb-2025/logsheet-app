package com.etms.dto;

import com.etms.pojos.Courses;
import com.etms.pojos.Employee;
import com.etms.pojos.LogType;
import com.etms.pojos.Logsheet;
import com.etms.pojos.Modules;
import com.etms.pojos.Schedules;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ModuleProgressReportDTO {
    private List<Logsheet> logs;
    private int topicsCovered;
    private int totalTopics;
    private double progressPercentage;

    public ModuleProgressReportDTO(List<Logsheet> logs, int topicsCovered, int totalTopics, double progressPercentage) {
        this.logs = logs;
        this.topicsCovered = topicsCovered;
        this.totalTopics = totalTopics;
        this.progressPercentage = progressPercentage;
    }

    // Getters and Setters
}
