$(function () {
  var thisUrl = window.location.href,
    p1_jrg9wef = thisUrl.indexOf("/sales/shop/dealPay/id/"),
    dealId_gcm,
    prP = $("p.deal-finish-price-title b"),
    price = parseInt(prP.text().trim().replace(" ", ""));
  var allow = true;
  if (
    p1_jrg9wef !== -1 &&
    allow
    //&& ($('.gc-user-teacher').length > 0 || $('.gc-user-admin').length > 0)		// show for teachers & admins only
  ) {
    // ~ Config

    // ~ :: Dolami

    // предложения, которые для которых разрешить рассрочку "Долями"
    var allowOfferIds = [
      3247290, 3247291, 3264219, 3264223, 3264225, 3264292, 3264293, 3264294,
      3275435, 3275436, 3275437, 3289342, 3289348, 3289349,
    ];
    // предложения, которые для которых запретить рассрочку "Долями"
    var disallowOfferIds = [];

    // разрешить ли показывать для всех предложений КРОМЕ исключений
    var allowForAll = true;

    // ~ Implementation

    var allowOfferIdsMap = {};
    for (var i = 0; i < allowOfferIds.length; i++)
      allowOfferIdsMap[allowOfferIds[i]] = 1;

    var disallowOfferIdsMap = {};
    for (var i = 0; i < disallowOfferIds.length; i++)
      disallowOfferIdsMap[disallowOfferIds[i]] = 1;

    var finallyAllow = allowForAll;

    $(".deal-positions > li").each(function (i, v) {
      var offerId = $(v).attr("data-offer-id");

      if (allowOfferIdsMap[offerId] !== undefined) {
        finallyAllow = true;
      } else {
        finallyAllow = false;
      }

      if (disallowOfferIdsMap[offerId] !== undefined) finallyAllow = false;
    });
    if (price < 5000 || price > 30000) {
      document.getElementById("dolami_button_container").style.display = "none";
      document.getElementById("optala_dolyami_text").style.display = "none";
      document.getElementById("optala_dolyami_text2").style.display = "none";
    }
    if (!finallyAllow) {
      window.addEventListener("DOMContentLoaded", () => {
        //container_dolyami
        document.getElementById("container_dolyami").style.display = "none";
        //container_active_credit
        document.getElementById("container_active_credit").style.display =
          "none";
        //container_belarus_credit
        document.getElementById("container_belarus_credit").style.display =
          "none";
        document.getElementById("text_credit_header").style.display = "none";
        document.getElementById("text_russia_credit").style.display = "none";
        document.querySelector("#tinkoffcredit").style.display = "none";
        console.log("Способ оплаты Долями скрыт для данного предложения");
      });
    } else {
      document.getElementById("text_full_pay").style.display = "none";
      document.querySelector("h3.credit-title").style.display = "none";
      document.querySelector("#YaKassa_bank_card").style.display = "none";
      document.querySelector("h3.card-title").style.display = "none";
      document.querySelector("h3.other-title").style.display = "none";
      document.getElementById("alternative-methods-container").style.display =
        "none";
    }

    // ~

    console.log("Init Dolami button");
    var targetContainer = $("#tinkoff");
    var dolamiButtonContainer = $("#dolami_button_container");
    targetContainer.after(dolamiButtonContainer);

    p1_jrg9wef += 23;
    dealId_gcm = thisUrl.substr(p1_jrg9wef);
    dealId_gcm = parseInt(dealId_gcm);
    let order_number_gc = document
      .getElementsByTagName("h1")[0]
      .textContent.split("#")[1];
    console.log(order_number_gc);
    let order_name = document.querySelector(
      ".position-actual-title"
    ).textContent;
    console.log(order_name);
    let url = "http://89.223.70.117:5000/check_deal?";
    console.log(url);
    let url_api =
      url +
      "order_number_gc=" +
      order_number_gc +
      "&order_name=" +
      order_name +
      "&price=" +
      price +
      "&user_id_gc=" +
      window.accountUserId;
    console.log(url_api);
    // set correct URL
    $("#dolami_button_oplata, #dolami_button_oplata2").on(
      "click.gcm",
      function () {
        window.location.href = url_api;
      }
    );
    console.log("Order id = " + dealId_gcm);
    console.log(
      "Dolami buttons: ",
      $("#dolami_button_oplata, #dolami_button_oplata2")
    );
    console.log("Dolami container: ", dolamiButtonContainer);

    // append panel for payment
    var targetContainer = $("#tinkoff");

    console.log("Insert before: ", targetContainer);

    if (finallyAllow && price > 5000 && price < 30000) {
      //targetContainer.after(dolamiButtonContainer);
      dolamiButtonContainer.show();
    }
  }
});

3449389, 3449401, 3449405, 3449409, 3449414, 3449418;

$(function () {
  var thisUrl = window.location.href,
    p1_jrg9wef = thisUrl.indexOf("/sales/shop/dealPay/id/"),
    dealId_gcm,
    prP = $("p.deal-finish-price-title b"),
    price = parseInt(prP.text().trim().replace(" ", ""));
  var allow = true;

  //console.log('Dolami payment GCA initialized');
  if (
    p1_jrg9wef !== -1 &&
    allow
    //&& ($('.gc-user-teacher').length > 0 || $('.gc-user-admin').length > 0)		// show for teachers & admins only
  ) {
    // ~ Config

    // ~ :: Dolami

    // предложения, которые для которых разрешить рассрочку "Долями"
    var allowOfferIds = [
      3247290, 3247291, 3264219, 3264223, 3264225, 3264292, 3264293, 3264294,
      3275435, 3275436, 3275437, 3289342, 3289348, 3289349, 3314381, 3314386,
      3314391, 3319474, 3319480, 3319482, 3247178, 3247186, 3382273, 3382278,
      3382284, 3391305, 3391315, 3391322, 3391472, 3391477, 3391479, 3400590,
      3400598, 3405631, 3405638, 3405642, 3416763, 3416773, 3416779, 3426715,
      3426718, 3426726,
    ];
    // предложения, которые для которых запретить рассрочку "Долями"
    var disallowOfferIds = [];

    var intOfferIds = [3449389, 3449401, 3449405, 3449409, 3449414, 3449418];

    // разрешить ли показывать для всех предложений КРОМЕ исключений
    var allowForAll = true;

    // ~ Implementation

    var allowOfferIdsMap = {};
    for (var i = 0; i < allowOfferIds.length; i++)
      allowOfferIdsMap[allowOfferIds[i]] = 1;

    var disallowOfferIdsMap = {};
    for (var i = 0; i < disallowOfferIds.length; i++)
      disallowOfferIdsMap[disallowOfferIds[i]] = 1;

    var intOfferIdsMap = {};
    for (var i = 0; i < intOfferIds.length; i++)
      intOfferIdsMap[intOfferIds[i]] = 1;

    var finallyAllow = allowForAll;
    var intFinallyAllow = allowForAll;

    $(".deal-positions > li").each(function (i, v) {
      var offerId = $(v).attr("data-offer-id");

      if (allowOfferIdsMap[offerId] !== undefined) {
        finallyAllow = true;
        intFinallyAllow = false;
      } else if (intOfferIdsMap[offerId] !== undefined) {
        intFinallyAllow = true;
        finallyAllow = false;
      } else {
        finallyAllow = false;
        intFinallyAllow = false;
      }

      if (disallowOfferIdsMap[offerId] !== undefined) finallyAllow = false;
    });
    if (price < 5000 || price > 30000) {
      //container_dolyami
      document.getElementById("container_dolyami").style.display = "none";
    }
    console.log(finallyAllow)
    console.log(intFinallyAllow)
    if (!finallyAllow && !intFinallyAllow) {
      window.addEventListener("DOMContentLoaded", () => {
        //container_dolyami
        document.getElementById("container_dolyami").style.display = "none";
        //container_active_credit
        document.getElementById("container_active_credit").style.display =
          "none";
        //container_belarus_credit
        document.getElementById("container_belarus_credit").style.display =
          "none";
        document.getElementById("text_credit_header").style.display = "none";
        document.getElementById("text_russia_credit").style.display = "none";
        let container_lava = document.getElementById("container_lava");
        let stripe_location = document.getElementById("stripe_card");
        container_lava.appendChild(stripe_location);
        console.log("Оплата рассрочкой скрыта");
        document.querySelector("#tinkoffcredit").style.display = "none";
        console.log("Способ оплаты Долями скрыт для данного предложения");
      });
    } else if(finallyAllow && !intFinallyAllow) {
      document.getElementById("text_full_pay").style.display = "none";
      document.querySelector("h3.credit-title").style.display = "none";
      document.querySelector("#YaKassa_bank_card").style.display = "none";
      document.querySelector("h3.card-title").style.display = "none";
      document.querySelector("h3.other-title").style.display = "none";
      document.getElementById("container_lava").style.display = "none";
      document.getElementById("alternative-methods-container").style.display =
        "none";
      document.getElementById("stripe_card").style.display = "none";
      console.log("Оплата картой скрыта");
    } else if(intFinallyAllow) {
      //container_dolyami
      document.getElementById("container_dolyami").style.display = "none";
      //container_active_credit
      document.getElementById("container_active_credit").style.display =
          "none";
      //container_belarus_credit
      document.getElementById("container_belarus_credit").style.display =
          "none";
      document.getElementById("text_credit_header").style.display = "none";
      document.getElementById("text_russia_credit").style.display = "none";
      let container_lava = document.getElementById("container_lava");
      let stripe_location = document.getElementById("stripe_card");
      container_lava.appendChild(stripe_location);
      document.getElementById("text_full_pay").style.display = "none";
      document.querySelector("h3.credit-title").style.display = "none";
      document.querySelector("#YaKassa_bank_card").style.display = "none";
      document.querySelector("h3.card-title").style.display = "none";
      document.querySelector("h3.other-title").style.display = "none";
      document.getElementById("alternative-methods-container").style.display =
          "none";
      document.querySelector("#tinkoffcredit").style.display = "none";
    }

    // ~

    console.log("Init Dolami button");
    var targetContainer = $("#tinkoff");
    var dolamiButtonContainer = $("#dolami_button_container");
    targetContainer.after(dolamiButtonContainer);

    p1_jrg9wef += 23;
    dealId_gcm = thisUrl.substr(p1_jrg9wef);
    dealId_gcm = parseInt(dealId_gcm);
    let order_number_gc = document.getElementsByTagName("h1")[0].textContent.split("#")[1];
    console.log(order_number_gc);
    let order_name = document.querySelector(
      ".position-actual-title"
    ).textContent;
    console.log(order_name);
    let url = "http://89.223.70.117:5000/check_deal?";
    console.log(url);
    let url_api =
      url +
      "order_number_gc=" +
      order_number_gc +
      "&order_name=" +
      order_name +
      "&price=" +
      price +
      "&user_id_gc=" +
      window.accountUserId;
    console.log(url_api);
    // set correct URL
    $("#dolami_button_oplata, #dolami_button_oplata2").on(
      "click.gcm",
      function () {
        window.location.href = url_api;
      }
    );
    console.log("Order id = " + dealId_gcm);
    console.log(
      "Dolami buttons: ",
      $("#dolami_button_oplata, #dolami_button_oplata2")
    );
    console.log("Dolami container: ", dolamiButtonContainer);

    // append panel for payment
    var targetContainer = $("#tinkoff");

    console.log("Insert before: ", targetContainer);

    if (finallyAllow && price > 5000 && price < 30000) {
      //targetContainer.after(dolamiButtonContainer);
      dolamiButtonContainer.show();
    }
  }
});
