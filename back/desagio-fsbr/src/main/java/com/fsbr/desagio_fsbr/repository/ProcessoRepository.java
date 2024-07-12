package com.fsbr.desagio_fsbr.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fsbr.desagio_fsbr.entity.Processo;

@Repository
public interface ProcessoRepository  extends JpaRepository<Processo, UUID> {


    @Query("select count(*) from Processo")
	Long listarQtdProcessos(); 

 

 

}
