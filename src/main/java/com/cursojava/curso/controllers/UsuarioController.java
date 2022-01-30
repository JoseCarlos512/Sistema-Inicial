package com.cursojava.curso.controllers;

import com.cursojava.curso.dao.UsuarioDao;
import com.cursojava.curso.models.Usuario;
import com.cursojava.curso.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/usuario/{id}", method = RequestMethod.GET) /*Esta metodo se añade en la url*/
    public Usuario getUsuario(
        @RequestHeader("Authorization") String token,
        @PathVariable Long id
    ) {
        if (!validarToken(token))
            return new Usuario();

        Usuario usuario = usuarioDao.obtenerUsuario(id);
        return usuario;
    }

    @RequestMapping(value = "api/usuario", method = RequestMethod.PUT) /*Esta metodo se añade en la url*/
    public void update(
        @RequestHeader("Authorization") String token,
        @RequestBody Usuario usuario
    ) {
        if (!validarToken(token))
            return;

        usuarioDao.updateUsuario(usuario);
    }

    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.DELETE) /*Esta metodo se añade en la url*/
    public void delete(
        @RequestHeader("Authorization") String token,
        @PathVariable Long id
    ) {
        if (!validarToken(token))
            return;

        usuarioDao.eliminar(id);
    }

    @RequestMapping(value = "usuario-search")
    public Usuario buscar() {
        Usuario usuario = new Usuario();
        usuario.setNombre("Jose");
        usuario.setApellido("Leon");
        usuario.setEmail("Jose@gmail.com");
        usuario.setTelefono("990719883");
        return usuario;
    }

    @RequestMapping(value = "api/usuarios", method = RequestMethod.GET)
    public List<Usuario> usuarios(
            @RequestHeader("Authorization") String token
    ) {

        if (!validarToken(token))
            return null;

        return usuarioDao.getUsuarios();
    }

    @RequestMapping(value = "api/usuarios", method = RequestMethod.POST)
    public void registrarUsuario(
        @RequestBody Usuario usuario
    ) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, usuario.getPassword());
        usuario.setPassword(hash);

        usuarioDao.registrar(usuario);
    }

    private boolean validarToken(String token) {
        String usuarioID = jwtUtil.getKey(token);

        return usuarioID != null;
    }
}
