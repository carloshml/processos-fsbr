package com.fsbr.desagio_fsbr.entity;

import java.time.LocalDateTime;
import java.util.UUID;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "tb_processo")
public class Processo {

    @Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

    @NotNull
    @Pattern(regexp = "\\d{7}-\\d{2}\\.\\d{4}\\.\\d\\.\\d{2}\\.\\d{4}")
    private String npu;

    @NotNull
    private LocalDateTime dataCadastro;

    @NotNull
    private LocalDateTime dataVisualização;

    @NotNull
    @NotBlank
    private String municipio;

    @NotNull
    @NotBlank
    private String uf;

    @Lob  
    private byte[]  documento;

    public Processo() {
    }

    public String getNpu() {
        return npu;
    }

    public void setNpu(String npu) {
        this.npu = npu;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public LocalDateTime getDataVisualização() {
        return dataVisualização;
    }

    public void setDataVisualização(LocalDateTime dataVisualização) {
        this.dataVisualização = dataVisualização;
    }

    public String getMunicipio() {
        return municipio;
    }

    public void setMunicipio(String municipio) {
        this.municipio = municipio;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public byte[] getDocumento() {
        return documento;
    }

    public void setDocumento(byte[] documento) {
        this.documento = documento;
    }

}
