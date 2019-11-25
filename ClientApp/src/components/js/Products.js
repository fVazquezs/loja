import React from 'react';
import { EntityDataService } from '../../service/entities-data-service';
import { Button, Modal } from 'react-bootstrap';
import '../css/Products.css';

export class Products extends React.Component {

    constructor(props) {
        super(props);
        this.state = { products: [], renderProducts: [], productViewModalActive: false, productModal: null };
        this.productsDataService = new EntityDataService('Products');
        this.cartService = props.cartService;
    }

    async componentDidMount() {
        const products = await this.productsDataService.getAll();
        this.setState({ products: products, renderProducts: products })
    }

    filterProducts = value => {
        const products = this.state.products.filter(product => product.name.toLowerCase().includes(value.toLowerCase()));
        this.setState({ renderProducts: products })
    }

    productViewModal = () => {
        var quantity = 1;
        if (this.state.productModal !== null) {
            return (
                <div>
                    <Modal show={this.state.productViewModalActive} onHide={() => this.setState({ productViewModalActive: false })}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add {this.state.productModal.name} to cart?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='add-to-cart-modal-body'>
                                <b>Price: $ </b>{this.state.productModal.price}
                                <input className="add-to-cart-input" type="number" onChange={(e) => quantity = e.target.value} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => this.setState({ productViewModalActive: false })}>Close</Button>
                            <Button bsStyle="primary" onClick={() => {
                                this.setState({ productViewModalActive: false })
                                this.cartService.addToCart(this.state.productModal, quantity)
                            }} >Add To Cart</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        }
    }

    renderProducts = () => {
        return (
            <div className="product-list">
                {this.state.renderProducts.map(product => {
                    const url = "https://i.imgur.com/" + product.imgPath + ".jpg";
                    return (
                        <div key={product.id} className="product-card" onClick={() => this.setState({ productViewModalActive: true, productModal: product })}>
                            <div className="product-image">
                                <img className="product-image-rendering" alt="" src={url} />
                            </div>
                            <div className='product-name'><b>{product.name}</b></div>
                            $ {product.price}
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.productViewModal()}
                <div className='page-title'><b>All Products</b></div>
                <input className="search-product" name="search-product" onChange={e => this.filterProducts(e.target.value)} />
                {this.renderProducts()}
            </div>
        )
    }
}