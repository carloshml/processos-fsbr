package com.fsbr.desagio_fsbr.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

public class ProcessoException extends RuntimeException {
	
	public ProblemDetail toProblemDetail() {
		var pb =  ProblemDetail.forStatus(
				HttpStatus.INTERNAL_SERVER_ERROR);
		pb.setTitle("Internal Server Error");
		return pb;				
	}

}