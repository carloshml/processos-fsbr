package com.fsbr.desagio_fsbr.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fsbr.desagio_fsbr.dto.ProcessRecord;
import com.fsbr.desagio_fsbr.entity.Processo;
import com.fsbr.desagio_fsbr.repository.ProcessoRepository;

@Service
public class ProcessoService {

    ProcessoRepository processoRepository;

    public ProcessoService(ProcessoRepository pr) {
        processoRepository = pr;
    }

    public Processo criar(ProcessRecord process) {
        return processoRepository.save(process.toProcesso());
    }

    public List<Processo>  getAll() {
        return processoRepository.findAll();
    }

}
