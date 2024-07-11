package com.fsbr.desagio_fsbr.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestExceptionHandler {

	@ExceptionHandler(ProcessoException.class)
	public ProblemDetail handleFintechException(ProcessoException e) {
		return e.toProblemDetail();
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ProblemDetail handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {

		var fieldErrors = e.getFieldErrors().stream().map(f -> new InvalidParam(f.getField(), f.getDefaultMessage()))
				.toList();

		var pb = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);

		pb.setTitle("Parametro não foi validado");
		pb.setProperty("invalid-params", fieldErrors);
		return pb;
	}

	private record InvalidParam(String name, String reason) {
	}

}