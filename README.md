## Currency Rate API

#### Technologies

-   Node Js
-   Express

> Route /api/rates

---

> Queries: 1. Base - The home currency rates to be quoted against (e.g. CZK);

> Queries: 2. Currency - The specific exchange rates (e.g. EUR,GBP,USD).

### Response

##### On Success

-   Result - Result containing result info
    -   Base - The requested home rate
    -   Date - Current date
    -   Rates - Object of requested currency

##### On Error

-   Error - Object containing error info
    -   API - API name
    -   URL - Url
    -   Message - Error message

> -   By Collins Abadaike abadaikecollins@gmail.com
