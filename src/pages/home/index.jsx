import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./styles.css"

// const PRODUTOS = [
//     {
//         nome: "Produto 1",
//         preco: 1299.99,
//         categoria: "Eletrônicos",
//         marca: "Samsung",
//     }, {
//         nome: "Produto 2",
//         preco: 1299.99,
//         categoria: "Eletrônicos",
//         marca: "Samsung",
//     }
// ]

export default function Home() {

    const [produtos, setProdutos] = useState([])

    const [formData, setFormData] = useState({
        nome: "",
        categoria: "",
        fornecedor: "",
        preco: "",
        url: "",
        descricao: "",
        id: ""
    })


    function buscarProdutosDoLocalStorage() {
        const produtosStorage = localStorage.getItem("@PRODUCTS")

        if (produtosStorage) {
            const produtosArray = JSON.parse(produtosStorage)

            setProdutos(produtosArray)
        }
    }

    useEffect(() => {
        buscarProdutosDoLocalStorage()
    }, [])

    function salvarProdutos(event) {
        event.preventDefault()
        setProdutos([...produtos, { ...formData, id: Date.now() }])

        localStorage.setItem("@PRODUCTS", JSON.stringify([...produtos, { ...formData, id: Date.now() }]))

        setFormData({
            nome: "",
            categoria: "",
            fornecedor: "",
            preco: "",
            url: "",
            descricao: "",
            id: ""
        })
    }


    return (
        <div className="home_container">

            <form className="form_container" onSubmit={(event) => salvarProdutos(event)}>
                <h3 className="title_home">Formulário de Produtos</h3>

                <div className="container_input">
                    <span>Nome</span>
                    <input
                        placeholder="Ex: Celular"
                        value={formData.nome}
                        onChange={(event) => setFormData({ ...formData, nome: event.target.value })} />
                </div>

                <div className="container_input">
                    <span>Categoria</span>
                    <input
                        placeholder="Ex: Eletrônicos"
                        value={formData.categoria}
                        onChange={(event) => setFormData({ ...formData, categoria: event.target.value })}
                    />
                </div>

                <div className="container_input">
                    <span>Fornecedor</span>
                    <input
                        placeholder="Ex: Samsung"
                        value={formData.fornecedor}
                        onChange={(event) => setFormData({ ...formData, fornecedor: event.target.value })}
                    />
                </div>

                <div className="container_input">
                    <span>Preço (R$)</span>
                    <input
                        placeholder="Ex: 999.99"
                        value={formData.preco}
                        onChange={(event) => setFormData({ ...formData, preco: event.target.value })}
                    />
                </div>

                <div className="container_input">
                    <span>URL da imagem</span>
                    <input
                        placeholder="Ex: https://www.drive.com/samsung.jpg"
                        value={formData.url}
                        onChange={(event) => setFormData({ ...formData, url: event.target.value })}
                    />
                </div>

                <div className="container_input">
                    <span>Descrição</span>
                    <textarea
                        placeholder="Ex: Informe a descrição do produto"
                        value={formData.descricao}
                        onChange={(event) => setFormData({ ...formData, descricao: event.target.value })}

                    />
                </div>

                <div className="container_btn_save">
                    <button className="btn_save">Salvar</button>
                </div>

            </form>

            <div className="form_list">
                <h3>Lista de Produtos</h3>

                {
                    produtos.map((produto) => {
                        return (
                            <Link to={`/details/${produto.id}`}>
                                <div className="card_list_home">
                                    <div className="line">
                                        <span className="title">{produto.nome} - {produto.id}</span>
                                        <span className="title">R$ {produto.preco}</span>
                                    </div>
                                    <div className="line">
                                        <span>{produto.categoria}</span>
                                        <span>{produto.marca}</span>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }


            </div>

        </div>
    )
}