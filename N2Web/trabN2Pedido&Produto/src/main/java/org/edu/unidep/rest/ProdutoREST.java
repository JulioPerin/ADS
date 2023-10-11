package org.edu.unidep.rest;

import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.edu.unidep.command.ProdutoCommand;
import org.edu.unidep.model.Produto;
import org.edu.unidep.repository.ProdutoRepository;
import org.edu.unidep.rest.request.ProdutoRequest;
import org.edu.unidep.rest.response.ProdutoResponse;
import org.edu.unidep.service.ProdutoService;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.stream.Collectors;

@Path("/produto")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProdutoREST {
    private final ProdutoService produtoService;
    private final ProdutoRepository produtoRepository;

    @Inject
    public ProdutoREST(ProdutoService produtoService,
                       ProdutoRepository produtoRepository){
        this.produtoRepository = produtoRepository;
        this.produtoService = produtoService;
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarProdutos() {
        List<Produto> produtos = produtoRepository.listarProdutos();
        List<ProdutoResponse> produtosResponse = produtos.stream()
                .map(ProdutoResponse::toResponse)
                .collect(Collectors.toList());
        return Response.ok(produtosResponse).build();
    }

    @GET
    @Path("/{codigo}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response buscarProduto(@PathParam("codigo") Long codigo) {
        Produto produto = produtoRepository.buscarProduto(codigo);
        if (produto == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        ProdutoResponse produtoResponse = ProdutoResponse.toResponse(produto);
        return Response.ok(produtoResponse).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public void salvar(@RequestBody @Valid ProdutoRequest request){
        ProdutoCommand produtoCommand = ProdutoRequest.toCommand(request);
        produtoRepository.salvarProduto(produtoCommand);
    }

    @PUT
    @Path("/{codigo}")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response editarProduto(@PathParam("codigo") Long codigo, @RequestBody ProdutoCommand produto) {
        ProdutoCommand produtoAtualizado = produtoService.atualizar(codigo, produto);
        return Response.ok(produtoAtualizado).build();
    }

    @DELETE
    @Path("/{codigo}")
    @Transactional
    public Response excluirProduto(@PathParam("codigo") Long codigo) {
        Produto produto = produtoRepository.buscarProduto(codigo);
        if (produto == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        produtoRepository.excluirProduto(codigo);
        return Response.noContent().build();
    }
}
