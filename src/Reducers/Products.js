import { REQUEST_PRODUCTS, RECEIVE_PRODUCTS, FILTER_PRODUCTS, Will_Upload_Product, Did_Upload_Product, Clicked_Product_ID, WILL_REQUEST_CATEGORY_PRODUCT, DID_REQUEST_CATEGORY_PRODUCT, WILL_GET_BUYING_PRODUCT, DID_GET_BUYING_PRODUCT, WILL_GET_SELLING_PRODUCT, DID_GET_SELLING_PRODUCT, WILL_GET_PROFILE_STATS, DID_GET_PROFILE_STATS, ERROR_UPLOAD_PRODUCT} from '../Actions/productsAction';

export default function Products (state = {clickedProductID:-1}, action ){
  switch (action.type) {
    case Clicked_Product_ID:
      return Object.assign({}, state, {
        clickedProductID : action.clickedProductID
      })

    case WILL_GET_BUYING_PRODUCT:
      return Object.assign({}, state, {
        isFetching : true,
        didInvalidate : false
      })

    case DID_GET_BUYING_PRODUCT:
      return Object.assign({}, state, {
        isFetching:false,
        didInvalidate:false,
        products: action.products,
        initialProducts:action.products
      })

    case WILL_GET_SELLING_PRODUCT:
      return Object.assign({}, state, {
        isFetching : true,
        didInvalidate : false
      })

    case DID_GET_SELLING_PRODUCT:
      return Object.assign({}, state, {
        isFetching:false,
        didInvalidate:false,
        products: action.products,
        initialProducts:action.products
      })

    case REQUEST_PRODUCTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })

    case RECEIVE_PRODUCTS:
      return Object.assign({}, state, {
        page: state.page ? (state.page+15) : 15 ,
        isFetching: false,
        didInvalidate: false,
        products: action.products.slice(0, state.page?state.page+15 : 15),
        initialProducts:action.products

      })

    case WILL_REQUEST_CATEGORY_PRODUCT:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })


    case DID_REQUEST_CATEGORY_PRODUCT:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        products: action.products,
        initialProducts:action.products
      })

    case Will_Upload_Product:
      return Object.assign({}, state, {
        isUploading: true
      })

    case Did_Upload_Product:
      return Object.assign({}, state, {
        isUploading : false
      })

    case ERROR_UPLOAD_PRODUCT:
      return Object.assign({}, state, {
        isUploading:false
      })

    case WILL_GET_PROFILE_STATS:
      return Object.assign({}, state, {
        isFetching:true
      })

    case DID_GET_PROFILE_STATS:
      return Object.assign({}, state, {
        isFetching:false,
        profile_stats:action.profile_stats
      })

    case FILTER_PRODUCTS:
      var filteredProducts = [];
      for (var index = 0; index<state.initialProducts.length; index++)
      {
        if (state.initialProducts[index].description.indexOf(action.searchTerm) != -1 || state.initialProducts[index].name.indexOf(action.searchTerm) != -1)
        {
          filteredProducts.push(state.initialProducts[index]);
        }
      }

      return Object.assign({}, state, {
            isFetching: false,
            didInvalidate: false,
            products: filteredProducts
      })

    default:
      return state;
  }

}
