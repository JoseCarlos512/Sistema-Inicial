package com.cursojava.curso.dao;

import com.cursojava.curso.models.Usuario;

import java.util.List;

public interface UsuarioDao {

    Usuario obtenerUsuario(Long id);

    List<Usuario> getUsuarios();

    void eliminar(Long id);

    void registrar(Usuario usuario);

    void updateUsuario(Usuario usuario);

    Usuario obtenerUsuarioCredenciales(Usuario usuario);
}
