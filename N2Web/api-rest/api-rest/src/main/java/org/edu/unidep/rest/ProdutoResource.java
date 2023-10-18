package org.edu.unidep.rest;

import org.edu.unidep.model.Produto;
import org.edu.unidep.repository.ProdutoRepository;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/produtos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProdutoResource {

    @Inject
    ProdutoRepository produtoRepository;

    @GET
    public List<Produto> listarProdutos() {
        return produtoRepository.listarProdutos();
    }


    @GET
    @Path("/{codigo}")
    public Response buscarProdutoPorCodigo(@PathParam("codigo") Long codigo) {
        Produto produto = produtoRepository.buscarProdutoPorCodigo(codigo);
        if (produto == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(produto).build();
    }

    @POST
    @Transactional
    public Response cadastrarProduto(Produto produto) {
        produtoRepository.salvarProduto(produto);
        return Response.status(Response.Status.CREATED).build();
    }

    @PUT
    @Transactional
    @Path("/{codigo}")
    public Response atualizarProduto(@PathParam("codigo") Long codigo, Produto produtoAtualizado) {
        Produto produto = produtoRepository.buscarProdutoPorCodigo(codigo);
        if (produto == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        produto.setDescricao(produtoAtualizado.getDescricao());
        produto.setUnidadeDeMedida(produtoAtualizado.getUnidadeDeMedida());
        produto.setVencimento(produtoAtualizado.getVencimento());
        produtoRepository.atualizarProduto(produto);
        return Response.ok().build();
    }

    @DELETE
    @Transactional
    @Path("/{codigo}")
    public Response excluirProdutoPorCodigo(@PathParam("codigo") Long codigo) {
        Produto produto = produtoRepository.buscarProdutoPorCodigo(codigo);
        if (produto == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        produtoRepository.excluirProdutoPorCodigo(codigo);
        return Response.ok().build();
    }

}