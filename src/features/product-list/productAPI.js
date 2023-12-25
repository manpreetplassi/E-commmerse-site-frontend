export function fetchAllProducts() {
    return new Promise(async (resolve) => {
        const response = await fetch(`/products`);
        const data = await response.json();
        resolve({ data });
    });
}

export function fetchProductsByFilter(filter, sort, pagination) {
    return new Promise(async (resolve) => {
        let quaryString = "";
        for (let key in filter) {
            const ok = filter[key];
            for (let value in ok) {
                const stringValue = `${key}=${ok[value]}&`;
                quaryString += stringValue;
            }
        }
        for (let key in sort) {
            quaryString += `${key}=${sort[key]}&`;
        }
        for (let key in pagination) {
            quaryString += `${key}=${pagination[key]}&`;
        }
        const response = await fetch(
            `/products?` + quaryString
        );
        const data = await response.json();
        const totalItems = await response.headers.get("X-Total-Count");
        resolve({ data: { products: data, totalItems: +totalItems } });
    });
}

export function fetchProductById(id) {
    return new Promise(async (resolve) => {
        const response = await fetch("/products/" + id);
        const data = await response.json();
        resolve({ data });
    });
}

export function fetchFilterData() {
    return new Promise(async (resolve) => {
        const response = await fetch(`/filters`);
        const data = await response.json();
        resolve({ data });
    });
}
