import {call, put, select, take, fork, takeEvery} from 'redux-saga/effects'

import * as enums from '../enums/chequeActions'
import * as chequeActions from '../actions/chequeActions'


function* getChequeSaga(params) {
	console.log('getChequeSaga', params);

	try {

	} catch (error) {

	}
}


function _getList_MOCK() {
	return {
		"data": [
			{
				"acceptedSum": 0,
				"actualSum": 0,
				"baseSum": 0,
				"beginDateTime": {
					"afterNow": true,
					"beforeNow": true,
					"chronology": {
						"zone": {
							"fixed": true,
							"id": "string"
						}
					},
					"equalNow": true,
					"millis": 0
				},
				"cashier": {
					"code": "string",
					"locked": 0,
					"login": "string",
					"name": "string",
					"password": "string",
					"roles": [
						"CUSTOMER"
					]
				},
				"change": 0,
				"description": "string",
				"docNum": "string",
				"docType": "SALE",
				"egaisDigitalSignature": "string",
				"egaisReceiptUrl": "string",
				"egaisUrl": "string",
				"endDateTime": {
					"afterNow": true,
					"beforeNow": true,
					"chronology": {
						"zone": {
							"fixed": true,
							"id": "string"
						}
					},
					"equalNow": true,
					"millis": 0
				},
				"id": "string",
				"inventPositions": [
					{
						"alcoholType": "NO_ALCOHOL",
						"allNoModifiers": [
							{
								"barcode": "string",
								"base": true,
								"goodsName": "string",
								"name": "string",
								"price": 0,
								"qty": 0
							}
						],
						"appliedModifiers": [
							{}
						],
						"barcode": "string",
						"baseGoodMinPrice": 0,
						"baseGoodPrice": 0,
						"basePrice": 0,
						"baseQuantity": 0,
						"baseSum": 0,
						"bottleBarcodes": [
							"string"
						],
						"calculatedUnitPriceWithModifiers": 0,
						"description": "string",
						"discPercent": 0,
						"discSum": 0,
						"discounts": [
							{
								"code": "string",
								"position": true,
								"sum": 0,
								"type": "PERCENT",
								"value": 0
							}
						],
						"goodBaseSum": 0,
						"goodDiscSum": 0,
						"goodPosSum": 0,
						"id": "string",
						"inventCode": "string",
						"itemType": "INVENTORY",
						"measure": "pcs",
						"minPrice": 0,
						"modifierGroupName": "string",
						"name": "string",
						"posNum": 0,
						"posSum": 0,
						"price": 0,
						"quantity": 0,
						"taxMode": "COMMON",
						"type": "MAIN",
						"userCode": "string",
						"vatTag": "1102",
						"vatValue": 0,
						"volume": 0
					}
				],
				"kktRegistrationStatus": "SUCCESS",
				"linkedDocId": "string",
				"moneyPositions": [
					{
						"createDateTime": "string",
						"paymentDetails": {
							"type": "MOCK"
						},
						"paymentType": "CASH",
						"sum": 0,
						"userCode": "string"
					}
				],
				"reversedPositions": [
					{
						"alcoholType": "NO_ALCOHOL",
						"allNoModifiers": [
							{
								"barcode": "string",
								"base": true,
								"goodsName": "string",
								"name": "string",
								"price": 0,
								"qty": 0
							}
						],
						"appliedModifiers": [
							{
								"alcoholType": "NO_ALCOHOL",
								"allNoModifiers": [
									{
										"barcode": "string",
										"base": true,
										"goodsName": "string",
										"name": "string",
										"price": 0,
										"qty": 0
									}
								],
								"appliedModifiers": [
									{}
								],
								"barcode": "string",
								"baseGoodMinPrice": 0,
								"baseGoodPrice": 0,
								"basePrice": 0,
								"baseQuantity": 0,
								"baseSum": 0,
								"bottleBarcodes": [
									"string"
								],
								"calculatedUnitPriceWithModifiers": 0,
								"description": "string",
								"discPercent": 0,
								"discSum": 0,
								"discounts": [
									{
										"code": "string",
										"position": true,
										"sum": 0,
										"type": "PERCENT",
										"value": 0
									}
								],
								"goodBaseSum": 0,
								"goodDiscSum": 0,
								"goodPosSum": 0,
								"id": "string",
								"inventCode": "string",
								"itemType": "INVENTORY",
								"measure": "pcs",
								"minPrice": 0,
								"modifierGroupName": "string",
								"name": "string",
								"posNum": 0,
								"posSum": 0,
								"price": 0,
								"quantity": 0,
								"taxMode": "COMMON",
								"type": "MAIN",
								"userCode": "string",
								"vatTag": "1102",
								"vatValue": 0,
								"volume": 0
							}
						],
						"barcode": "string",
						"baseGoodMinPrice": 0,
						"baseGoodPrice": 0,
						"basePrice": 0,
						"baseQuantity": 0,
						"baseSum": 0,
						"bottleBarcodes": [
							"string"
						],
						"calculatedUnitPriceWithModifiers": 0,
						"description": "string",
						"discPercent": 0,
						"discSum": 0,
						"discounts": [
							{
								"code": "string",
								"position": true,
								"sum": 0,
								"type": "PERCENT",
								"value": 0
							}
						],
						"goodBaseSum": 0,
						"goodDiscSum": 0,
						"goodPosSum": 0,
						"id": "string",
						"inventCode": "string",
						"itemType": "INVENTORY",
						"measure": "pcs",
						"minPrice": 0,
						"modifierGroupName": "string",
						"name": "string",
						"posNum": 0,
						"posSum": 0,
						"price": 0,
						"quantity": 0,
						"reverseDateTime": "string",
						"taxMode": "COMMON",
						"type": "MAIN",
						"userCode": "string",
						"vatTag": "1102",
						"vatValue": 0,
						"volume": 0
					}
				],
				"shift": {
					"closeDate": {
						"afterNow": true,
						"beforeNow": true,
						"chronology": {
							"zone": {
								"fixed": true,
								"id": "string"
							}
						},
						"equalNow": true,
						"millis": 0
					},
					"id": "string",
					"kkmInfo": {
						"channel": "string",
						"cutState": "string",
						"fiscalInfo": {
							"address": "string",
							"firstStalledDocDate": {
								"afterNow": true,
								"beforeNow": true,
								"chronology": {
									"zone": {
										"fixed": true,
										"id": "string"
									}
								},
								"equalNow": true,
								"millis": 0
							},
							"fnErrors": [
								"EMERG_CRYPTO_REPLACE"
							],
							"fnExpirationDate": {
								"afterNow": true,
								"beforeNow": true,
								"chronology": {
									"zone": {
										"fixed": true,
										"id": "string"
									}
								},
								"equalNow": true,
								"millis": 0
							},
							"fnNo": "string",
							"inn": "string",
							"jurAddress": "string",
							"kktMode": {
								"autoMode": true,
								"autonomusMode": true,
								"encryptData": true,
								"usedForBlanks": true,
								"usedForInternet": true,
								"usedForServices": true
							},
							"ofdChannel": "string",
							"ofdHost": "string",
							"ofdINN": "string",
							"ofdName": "string",
							"ofdPort": 0,
							"regDate": {
								"afterNow": true,
								"beforeNow": true,
								"chronology": {
									"zone": {
										"fixed": true,
										"id": "string"
									}
								},
								"equalNow": true,
								"millis": 0
							},
							"regDoneCnt": 0,
							"regNo": "string",
							"regRemainsCnt": 0,
							"stalledDocCnt": 0,
							"taxCode": [
								"COMMON"
							]
						},
						"fiscalled": true,
						"fnSoftware": "string",
						"fnVersion": "string",
						"modelName": "string",
						"protocol": "string",
						"rate": "string",
						"serialNo": "string",
						"shiftNum": 0,
						"withOFD": true
					},
					"kkmInfoReceiveStatus": "NOT_NEEDED",
					"lastCheckNum": 0,
					"lastMoneyCheckNum": 0,
					"openDate": {
						"afterNow": true,
						"beforeNow": true,
						"chronology": {
							"zone": {
								"fixed": true,
								"id": "string"
							}
						},
						"equalNow": true,
						"millis": 0
					},
					"shiftNum": 0,
					"shiftTotals": {
						"cashIns": 0,
						"cashOuts": 0,
						"corrIns": 0,
						"corrOuts": 0,
						"returns": 0,
						"returnsByCard": 0,
						"returnsByCash": 0,
						"sales": 0,
						"salesByCard": 0,
						"salesByCash": 0
					},
					"shiftType": "OPERATIONAL"
				},
				"status": "OPENED",
				"userCode": "string"
			}
		],
		"pos": 0,
		"total_count": 0
	}
}

export default function*() {
	yield [
		takeEvery(enums.GET_CHEQUE.REQUEST, getChequeSaga)
	]
}