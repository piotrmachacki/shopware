<template>
    <div id="app-container">

        <nav class="navbar bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
            <div class="container">
                <span class="navbar-brand mb-0 h1">Shopware Listing</span>
                <select v-model.number="sort" class="form-select product-sort">
                    <option v-for="option in sortOptions" :key="option.value" :selected="sort === option.value" :value="option.value">
                        {{ option.text }}
                    </option>
                </select>
            </div>
        </nav>

        <div class="container p-3 p-sm-4 p-lg-5">
            <form class="d-flex p-3 p-sm-4 p-lg-5" role="search">
                <input class="form-control" type="search" placeholder="Szukaj...">
            </form>
        </div>

        <div class="container-fluid h-100 bg-body-secondary py-4">
            <div class="container h-100">

                <div class="product-list">
                    <div v-for="product in products" :key="product.id" class="card product-item p-3">
                        <header class="product-item-header mb-1">
                            <strong>{{ product.name }}</strong>
                        </header>
                        <p class="product-item-description">
                            {{ product.description }}
                        </p>
                        <div class="product-item-price">
                            <strong>Cena</strong> {{ product.price }} zł
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                sort: 1,
                sortOptions: [
                    { value: 1, text: 'Najtańsze' },
                    { value: 2, text: 'Najdroższe' },
                ],
                products: [
                    { id: 1, name: 'Card title', description: 'Ut impedit totam exercitationem laboriosam maiores maxime rerum et placeat. Quis sit veritatis quia asperiores iure omnis. Voluptatem sed quaerat aut laborum necessitatibus illum.', price: 234 },
                    { id: 2, name: 'Card title', description: 'Illum accusamus et consectetur id consequatur ullam sit aut. Aut sint delectus aut modi recusandae sit quas laborum nihil. Non error totam iusto est. Molestiae aut ducimus ipsam cum.', price: 234 },
                    { id: 3, name: 'Card title', description: 'Dolores eaque quae consequatur ut omnis perferendis non qui voluptate. Ad facere aliquid in sapiente est. Ea suscipit quia optio. Aut architecto velit est porro iste omnis doloribus et. Repudiandae sunt necessitatibus. Magni quis nulla laboriosam.', price: 234 },
                    { id: 4, name: 'Card title', description: 'Quis omnis fuga. Ut et optio velit aut aut in quod molestias magnam. Eligendi deleniti mollitia.', price: 234 },
                    { id: 5, name: 'Card title', description: 'Magnam vero sint iusto iste non nam magnam sed. Excepturi doloremque odio. Et necessitatibus dolorem dicta occaecati aut laudantium. Dolor dolorem voluptatem eos enim consequuntur qui autem amet consequatur.', price: 234 },
                    { id: 6, name: 'Card title', description: 'Eos laudantium suscipit velit ea eos aut ut alias. Repellat esse aut. Ea quia consectetur.', price: 234 },
                ],
            };
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
