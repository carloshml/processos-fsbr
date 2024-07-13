package com.fsbr.desagio_fsbr.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<Processo> criar(@Valid @RequestBody ProcessRecord process) {
        var processo = processoService.criar(process);
        return ResponseEntity.ok(processo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Processo> getProcessoById(@PathVariable UUID id) {
        var processo = processoService.getProcessById(id);
        return ResponseEntity.ok(processo);
    }

    @GetMapping
    public ResponseEntity<List<Processo>> getAllProcesses() {
        var processos = processoService.getAll();
        return ResponseEntity.ok(processos);
    }

    @GetMapping(value = "/listarProcessosPaginado/{inicio}/{qtd}")
    public ResponseEntity<List<Processo>> listarProcessosPaginado(@PathVariable(value = "inicio") int inicio,
            @PathVariable(value = "qtd") int qtd) {

        PageRequest pageRequest = PageRequest.of(
                inicio,
                qtd,
                Sort.Direction.DESC,
                "dataCadastro");

        var processos = processoService.findAllPaginado(pageRequest);
        return ResponseEntity.ok(processos);
    }

    @GetMapping(value = "/listarQtdProcessos")
    public ResponseEntity<Long> listarQtdProcessos() {
        return ResponseEntity.ok(processoService.listarQtdProcessos());
    }

}
