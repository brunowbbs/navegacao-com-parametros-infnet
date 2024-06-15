import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Details() {

    const parametros = useParams()

    const [produtoDetalhes, setProdutoDetalhes] = useState({})



    function buscarProdutoPorId() {

        const responseStorage = localStorage.getItem("@PRODUCTS")

        if (responseStorage) {

            const produtos = JSON.parse(responseStorage)

            const produtoEncontrado = produtos.find((produto) => String(produto.id) === String(parametros.id))

            if (produtoEncontrado) {
                setProdutoDetalhes(produtoEncontrado)
            }



        }
    }

    useEffect(() => {
        buscarProdutoPorId()

    }, [])


    return (
        <div>
            <h1>{produtoDetalhes.nome}</h1>
            <p>{produtoDetalhes.preco}</p>
            <p>{produtoDetalhes.categoria}</p>
            <p>{produtoDetalhes.fornecedor}</p>
            <img src={produtoDetalhes.url} width={300} />
            <p>{produtoDetalhes.descricao}</p>

        </div>
    )
}