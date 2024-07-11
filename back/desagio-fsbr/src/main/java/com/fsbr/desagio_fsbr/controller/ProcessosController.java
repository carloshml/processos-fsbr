package com.fsbr.desagio_fsbr.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fsbr.desagio_fsbr.dto.ProcessRecord;
import com.fsbr.desagio_fsbr.entity.Processo;
import com.fsbr.desagio_fsbr.service.ProcessoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/processos")
public class ProcessosController {

    ProcessoService processoService;

    public ProcessosController(ProcessoService ps) {
        processoService = ps;
    }

    @PostMapping
    public ResponseEntity<Processo> criar( @Valid @RequestBody ProcessRecord process) {
         var processo = processoService.criar(process);
         return ResponseEntity.ok(processo);
    }

    // Get process by ID
    @GetMapping("/{id}")
    public Process getProcessById(@PathVariable Long id) {

        return null;
    }

    // Get all processes
    @GetMapping
    public ResponseEntity<List<Processo>> getAllProcesses() {
        var processos = processoService.getAll();
        return ResponseEntity.ok(processos);
    }
}
