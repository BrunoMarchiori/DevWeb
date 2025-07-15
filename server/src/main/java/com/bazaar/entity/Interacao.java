package com.bazaar.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class Interacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int curtidas;

    private int visualizacoes;

    @OneToOne
    @JoinColumn(name = "produto_id", referencedColumnName = "id")
    @JsonBackReference
    private Produto produto;

    public Interacao(Produto produto){
        this.curtidas = 0;
        this.visualizacoes = 0;
        this.produto = produto;
    }

}
