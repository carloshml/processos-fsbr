package com.fsbr.desagio_fsbr.dto;

 

import com.fsbr.desagio_fsbr.entity.Processo;

public record ProcessRecord(
                String npu,               
                String municipio,
                String uf,
                byte[] documento) {

        public Processo toProcesso() {
                return new Processo(npu,                              
                                municipio,
                                uf,
                                documento);

        }

}