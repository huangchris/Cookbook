# Phase 5: Requests

## Rails
### Models
* Request

### Controllers
* Api::RequestController (create, destroy, index)

### Views
* request/index.json.jbuilder

## Flux
### Views (React Components)
* RequestsIndex
  - RequestIndexItem
* RequestForm

### Stores
* Request

### Actions
* ApiActions.receiveAllRequests

### ApiUtil
* ApiUtil.fetchAllRequests
* ApiUtil.createRequest
* ApiUtil.destroyRequest

## Gems/Libraries
