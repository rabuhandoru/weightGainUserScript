// ==UserScript==
// @name        weight gain
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      rabuhandoru
// ==/UserScript==
"use strict"

let gainRatio = 3       // 増える体重の倍率
const viewDiff = false  // 増えた分の体重を表示したければ true に
const intervalSec = 0   // 一定時間ごとに太らせたければ 0 以外を入れる

function orgRound(value, base){
  return Math.round(value * (10**base)) / (10**base)
}

function weightAdd(str,weight,unitStr ) {
  const gainedWeight = orgRound(parseFloat(weight) * gainRatio, 1)
  const diffWeight = orgRound(gainedWeight - weight, 1)
  if (viewDiff){
    return String(gainedWeight)+unitStr+"("+ "+"+String(diffWeight)+unitStr +")"
  }else{
    return String(gainedWeight)+unitStr
  }
}

function replace(){
  document.body.innerHTML = document.body.innerHTML.replace(/([\d\.]+)\s*(kg|キロ|ｷﾛ|ｷﾛｸﾞﾗﾑ|㌔|キログラム|㎏|㌕|ｋｇ|lb|lbs)/ig,weightAdd)
  if (intervalSec){
    setTimeout(replace,intervalSec*1000)
  }
}

replace()
