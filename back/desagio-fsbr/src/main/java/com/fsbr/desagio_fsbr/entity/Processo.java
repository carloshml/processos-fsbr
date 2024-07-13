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
    @Pattern(regexp = "\\d{7}-\\d{2}\\.\\d{4}\\.\\d\\.\\d{2}\\.\\d{4}", message = " formato npu incorreto")
    private String npu;

    @NotNull
    private LocalDateTime dataCadastro = LocalDateTime.now();

    @NotNull
    private LocalDateTime dataVisualizacao = LocalDateTime.now();   

    @NotNull
    @NotBlank
    private String municipio;

    @NotNull
    @NotBlank
    private String uf;

    @NotNull
    @NotBlank
    private String documentoNome;

    @Lob
    @NotNull
    private byte[] documento;

    public Processo() {
    }

    public Processo(String npu2, String municipio2,
            String uf2, String documentoNome2, byte[] documento2) {
        npu = npu2;
        municipio = municipio2;
        uf = uf2;
        documentoNome = documentoNome2;
        documento = documento2;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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

    public LocalDateTime getDataVisualizacao() {
        return dataVisualizacao;
    }

    public void setDataVisualizacao(LocalDateTime dataVisualizacao) {
        this.dataVisualizacao = dataVisualizacao;
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

    public String getDocumentoNome() {
        return documentoNome;
    }

    public void setDocumentoNome(String documentoNome) {
        this.documentoNome = documentoNome;
    }

}
