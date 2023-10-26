package org.edu.unidep.rest;

import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.edu.unidep.command.PedidoCommand;
import org.edu.unidep.command.ProdutoCommand;
import org.edu.unidep.model.Pedido;
import org.edu.unidep.repository.PedidoRepository;
import org.edu.unidep.rest.request.PedidoRequest;
import org.edu.unidep.rest.request.ProdutoRequest;
import org.edu.unidep.rest.response.PedidoResponse;
import org.edu.unidep.service.PedidoService;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Path("/pedido")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PedidoREST {
    private final PedidoService pedidoService;
    private final PedidoRepository pedidoRepository;

    @Inject
    public PedidoREST(PedidoService pedidoService, PedidoRepository pedidoRepository) {
        this.pedidoService = pedidoService;
        this.pedidoRepository = pedidoRepository;
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public void criar(@RequestBody @Valid PedidoRequest request){
        PedidoCommand pedidoCommand = PedidoRequest.toCommand(request);
        pedidoRepository.criarPedido(pedidoCommand);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarTodosPedidos() {
        List<Pedido> pedidos = pedidoService.listarTodosPedidos();
        List<PedidoResponse> pedidosResponse = pedidos.stream()
                .map(PedidoResponse::toResponse)
                .collect(Collectors.toList());
        return Response.ok(pedidosResponse).build();
    }

    @GET
    @Path("/data/{data}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarPedidosPorData(@PathParam("data") String data) {
        LocalDate dataPedido = LocalDate.parse(data);
        List<Pedido> pedidos = pedidoService.listarPedidosPorData(dataPedido);
        List<PedidoResponse> pedidosResponse = pedidos.stream()
                .map(PedidoResponse::toResponse)
                .collect(Collectors.toList());
        return Response.ok(pedidosResponse).build();
    }

    @GET
    @Path("/cliente/{nome}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listarPedidosPorNomeCliente(@PathParam("nome") String nomeCliente) {
        List<Pedido> pedidos = pedidoService.listarPedidosPorNomeCliente(nomeCliente);
        List<PedidoResponse> pedidosResponse = pedidos.stream()
                .map(PedidoResponse::toResponse)
                .collect(Collectors.toList());
        return Response.ok(pedidosResponse).build();
    }
}
