package com.cursojava.curso.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "employee")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Employee {

    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY) /*Añadir el id al metodo merge*/
    @Id
    private Long id;

    @Column(name = "departamento")
    private String departamento;

    @Column(name = "sueldo")
    private Integer sueldo;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id")
    private Usuario user_employee;

}
