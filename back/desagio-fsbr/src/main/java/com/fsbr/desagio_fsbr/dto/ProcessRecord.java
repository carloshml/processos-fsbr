package com.fsbr.desagio_fsbr.dto;

import java.time.LocalDateTime;

public record ProcessRecord(
        String npu,
        LocalDateTime dataCadastro,
        LocalDateTime dataVisualização,
        String municipio,
        String uf,
        byte documento) {

}