package com.bazaar.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class Compra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false, unique = true)
    private Usuario usuario;


    private int valorTotal;

    private LocalDate dataCompra;

    public Compra(Usuario usuario, int valorTotal, LocalDate dataCompra) {
        this.usuario = usuario;

        this.valorTotal = valorTotal;
        this.dataCompra = dataCompra;
    }
}
