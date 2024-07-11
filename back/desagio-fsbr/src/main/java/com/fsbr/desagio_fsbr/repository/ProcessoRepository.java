package com.fsbr.desagio_fsbr.repository;

import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.fsbr.desagio_fsbr.entity.Processo;

@Repository
public class ProcessoRepository  extends JpaRepository<Processo, UUID> {

}
