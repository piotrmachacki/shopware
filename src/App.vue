<template>
    <div id="app-container">

        <nav class="navbar bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
            <div class="container">
                <span class="navbar-brand mb-0 h1">Shopware Listing</span>
                <select v-model.number="sort" class="form-select product-sort" @change="onChangeSort()">
                    <option v-for="option in sortOptions" :key="option.value" :selected="sort === option.value" :value="option.value">
                        {{ option.text }}
                    </option>
                </select>
            </div>
        </nav>

        <div class="container p-3 p-sm-4 p-lg-5">
            <form class="d-flex p-3 p-sm-4 p-lg-5" role="search" @submit.prevent>
                <input v-model="searchText" class="form-control" type="search" placeholder="Szukaj..." @input="onChangeText()">
            </form>
        </div>

        <div class="container-fluid flex-grow-1 bg-body-secondary py-4">
            <div class="container h-100">

                <div v-if="products.length" class="product-list">
                    <div v-for="product in products" :key="product.id" class="card product-item p-3">
                        <header class="product-item-header mb-1">
                            <strong>{{ product.name }}</strong>
                        </header>
                        <p class="product-item-description">
                            {{ product.description }}
                        </p>
                        <div class="product-item-price">
                            <strong>Cena</strong> {{ product.calculatedPrice.totalPrice.toFixed(2) }} zł
                        </div>
                    </div>
                </div>

                <div v-if="!products.length && loading" class="d-flex gap-2 justify-content-center align-items-center">
                    <div v-if="!searchText">
                        Wczytuję produkty
                    </div>
                    <div v-if="searchText">
                        Szukam produktów
                    </div>
                    <div class="spinner-border text-dark" role="status">
                        <span class="visually-hidden">Szukam...</span>
                    </div>
                </div>

                <div v-if="!products.length && !loading && !error" class="alert alert-dark" role="alert">
                    Nie znaleziono żadnych produktów
                </div>

                <div v-else-if="error" class="alert alert-danger" role="alert">
                    {{ error }}
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import { debounce } from 'lodash';

    export default {
        name: 'App',
        data() {
            return {
                error: null,
                loading: false,
                searchText: '',
                sort: 'asc',
                sortOptions: [
                    { value: 'asc', text: 'Najtańsze' },
                    { value: 'desc', text: 'Najdroższe' },
                ],
                products: [],
                onChangeText: () => {},
            };
        },
        computed: {
            requestParams() {
                const params = {};
                if (this.searchText) params.search = this.searchText;
                // params.sort = [{ field: 'calculatedPrice.totalPrice', order: this.sort }]; // NIE DZIAŁA, API ZWRACA BŁĄD
                return params;
            },
        },
        methods: {
            searchProducts() {
                const text = this.searchText;
                const fetchProducts = text ? this.fetchSearchedProducts : this.fetchDefaultProducts;
                this.products = [];
                this.loading = true;
                this.error = null;
                fetchProducts().then(response => {
                    if (text === this.searchText) {
                        this.products = response.data.elements;
                        this.loading = false;
                    }
                }).catch(error => {
                    this.loading = false;
                    this.error = error;
                });

            },
            fetchDefaultProducts() {
                return this.axios.post('product-listing/e435c9763b0d44fcab67ea1c0fdb3fa0', this.requestParams);
            },
            fetchSearchedProducts() {
                return this.axios.post('search', this.requestParams);
            },
            onChangeSort() {
                this.searchProducts();
            },
        },
        created() {
            this.onChangeText = debounce(this.searchProducts, 300);
            this.searchProducts();
        },
    };
</script>

<style lang="scss" scoped>
    @import 'bootstrap/scss/functions';
    @import 'bootstrap/scss/variables';
    @import 'bootstrap/scss/mixins';

    .product-sort {
        max-width: 200px;
    }
    .product-list {
        display: grid;
        gap: 1rem;
        .product-item {
            display: flex;
            flex-direction: column;

            &-header {
            }
            &-description {
                flex-grow: 1;
            }
            &-price {

            }
        }
    }

    @include media-breakpoint-up(sm) {
        .product-list {
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        }
    }

</style>
