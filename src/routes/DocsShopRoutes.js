import express from "express";

import bearer from "../middlewares/bearer";

import DocsInvoiceShop from "../models/DocsInvoiceShop";
import DocsReceiptsShop from "../models/DocsReceiptsShop";
import DocsSaleShop from "../models/DocsSaleShop";
import DocsRevaluationShop from "../models/DocsRevaluationShop";
import DocsResortingShop from "../models/DocsResortingShop";
import DocsPostingShop from "../models/DocsPostingShop";

const router = express.Router();

router.post("/invoices", bearer, (req, res) => {
  //console.log("Invoices from 1C:");
  //console.log(req.body);

  const newInvoiceDoc = new DocsInvoiceShop(req.body);
  newInvoiceDoc.save(err => {
    if (err) {
      console.error(err);
      res.status(400).send({ result: "error" });
    } else {
      console.log("Invoices DONE!");
      res.status(200).send({ result: "success" });
    }
  });
});

router.get("/invoices", bearer, (req, res) => {
  console.log("GET Invoices!");
  console.log(req.query);

  if (req.query === undefined) {
    const errorMessage = "Empty query to get Invoices from Shop!";
    console.error(errorMessage);
    res.status(400).send({ result: errorMessage });
  }

  const data1 = new Date(req.query.date_begin);
  const data2 = new Date(req.query.date_end);

  DocsInvoiceShop.aggregate()
    .match({ date: { $gte: data1, $lt: data2 } })
    .sort({ moment_of_changes: -1 })
    .group({ originalId: { $first: "$_id" }, _id: "$id_doc" })
    .lookup({
      from: "docsinvoiceshops",
      localField: "originalId",
      foreignField: "_id",
      as: "original_doc"
    })
    .project({ "original_doc.positions": 0 })
    .exec((err, results) => {
      if (err) {
        console.error(err);
        res.status(400).send({ result: err });
      } else {
        res.status(200).send({
          result: results.map(item => item.original_doc[0])
        });
      }
    });
});

router.get("/allinvoices", (req, res) => {
  console.log("GET ALL Invoices!");
  // console.log(req.query);

  DocsInvoiceShop.aggregate()
    .sort({ moment_of_changes: -1 })
    .group({ originalId: { $first: "$_id" }, _id: "$id_doc" })
    .lookup({
      from: "docsinvoiceshops",
      localField: "originalId",
      foreignField: "_id",
      as: "original_doc"
    })
    .project({ "original_doc.positions": 0 })
    .exec((err, results) => {
      if (err) {
        console.error(err);
        res.status(400).send({ result: err });
      } else {
        res.status(200).send({
          result: results.map(item => item.original_doc[0])
        });
      }
    });
});

router.post("/receipts", bearer, (req, res) => {
  // console.log('Receipts from 1C:');
  // console.log(req.body);

  const newReceiptsDoc = new DocsReceiptsShop(req.body);
  newReceiptsDoc.save(err => {
    if (err) {
      console.error(err);
      res.status(400).send({ result: "error" });
    } else {
      // console.log('Receipts DONE!');
      res.status(200).send({ result: "success" });
    }
  });
});

router.get("/receipts", bearer, (req, res) => {
  console.log("GET Receipts!");
  console.log(req.query);

  if (req.query === undefined) {
    const errorMessage = "Empty query to get Receipts from Shop!";
    console.error(errorMessage);
    res.status(400).send({ result: errorMessage });
  }

  const data1 = new Date(req.query.date_begin);
  const data2 = new Date(req.query.date_end);

  DocsReceiptsShop.aggregate()
    .match({ date: { $gte: data1, $lte: data2 } })
    .sort({ moment_of_changes: -1 })
    .group({ originalId: { $first: "$_id" }, _id: "$id_doc" })
    .lookup({
      from: "docsreceiptsshops",
      localField: "originalId",
      foreignField: "_id",
      as: "original_doc"
    })
    .exec((err, results) => {
      if (err) {
        console.error(err);
        res.status(400).send({ result: err });
      } else {
        res.status(200).send({
          result: results.map(item => item.original_doc[0])
        });
      }
    });
});

router.post("/sales", bearer, (req, res) => {
  // console.log('Sales from 1C:');
  // console.log(req.body);

  const newSaleDoc = new DocsSaleShop(req.body);
  newSaleDoc.save(err => {
    if (err) {
      console.error(err);
      res.status(400).send({ result: "error" });
    } else {
      // console.log('Sales DONE!');
      res.status(200).send({ result: "success" });
    }
  });
});

router.get("/sales", bearer, (req, res) => {
  console.log("GET Sales!");
  console.log(req.query);

  if (req.query === undefined) {
    const errorMessage = "Empty query to get Sales from Shop!";
    console.error(errorMessage);
    res.status(400).send({ result: errorMessage });
  }

  const data1 = new Date(req.query.date_begin);
  const data2 = new Date(req.query.date_end);

  DocsSaleShop.aggregate()
    .match({ date: { $gte: data1, $lte: data2 } })
    .sort({ moment_of_changes: -1 })
    .group({ originalId: { $first: "$_id" }, _id: "$id_doc" })
    .lookup({
      from: "docssaleshops",
      localField: "originalId",
      foreignField: "_id",
      as: "original_doc"
    })
    .project({ "original_doc.positions": 0 })
    .exec((err, results) => {
      if (err) {
        console.error(err);
        res.status(400).send({ result: err });
      } else {
        res.status(200).send({
          result: results.map(item => item.original_doc[0])
        });
      }
    });
});

router.post("/revaluations", bearer, (req, res) => {
  console.log("Revaluations from 1C:");
  console.log(req.body);

  const newRevaluationDoc = new DocsRevaluationShop(req.body);
  newRevaluationDoc.save(err => {
    if (err) {
      console.error(err);
      res.status(400).send({ result: "error" });
    } else {
      // console.log('Revaluations DONE!');
      res.status(200).send({ result: "success" });
    }
  });
});

router.get("/revaluations", bearer, (req, res) => {
  console.log("GET Revaluations!");
  console.log(req.query);

  if (req.query === undefined) {
    const errorMessage = "Empty query to get Revaluations from Shop!";
    console.error(errorMessage);
    res.status(400).send({ result: errorMessage });
  }

  const data1 = new Date(req.query.date_begin);
  const data2 = new Date(req.query.date_end);

  DocsRevaluationShop.aggregate()
    .match({ date: { $gte: data1, $lte: data2 } })
    .sort({ moment_of_changes: -1 })
    .group({ originalId: { $first: "$_id" }, _id: "$id_doc" })
    .lookup({
      from: "docsrevaluationshops",
      localField: "originalId",
      foreignField: "_id",
      as: "original_doc"
    })
    .project({ "original_doc.positions": 0 })
    .exec((err, results) => {
      if (err) {
        console.error(err);
        res.status(400).send({ result: err });
      } else {
        res.status(200).send({
          result: results.map(item => item.original_doc[0])
        });
      }
    });
});

router.post("/resortings", bearer, (req, res) => {
  console.log("Resortings from 1C:");
  console.log(req.body);

  const newResortingDoc = new DocsResortingShop(req.body);
  newResortingDoc.save(err => {
    if (err) {
      console.error(err);
      res.status(400).send({ result: "error" });
    } else {
      // console.log('Revaluations DONE!');
      res.status(200).send({ result: "success" });
    }
  });
});

router.get("/resortings", bearer, (req, res) => {
  console.log("GET Resortings!");
  console.log(req.query);

  if (req.query === undefined) {
    const errorMessage = "Empty query to get Revaluations from Shop!";
    console.error(errorMessage);
    res.status(400).send({ result: errorMessage });
  }

  const data1 = new Date(req.query.date_begin);
  const data2 = new Date(req.query.date_end);

  DocsResortingShop.aggregate()
    .match({ date: { $gte: data1, $lte: data2 } })
    .sort({ moment_of_changes: -1 })
    .group({ originalId: { $first: "$_id" }, _id: "$id_doc" })
    .lookup({
      from: "docsresortingshops",
      localField: "originalId",
      foreignField: "_id",
      as: "original_doc"
    })
    .project({ "original_doc.positions": 0 })
    .exec((err, results) => {
      if (err) {
        console.error(err);
        res.status(400).send({ result: err });
      } else {
        res.status(200).send({
          result: results.map(item => item.original_doc[0])
        });
      }
    });
});

router.post("/postings", bearer, (req, res) => {
  //console.log("Postings from 1C:");
  //console.log(req.body);

  const newPostingDoc = new DocsPostingShop(req.body);
  newPostingDoc.save(err => {
    if (err) {
      console.error(err);
      res.status(400).send({ result: "error" });
    } else {
      console.log("Postings DONE!");
      res.status(200).send({ result: "success" });
    }
  });
});

router.get("/postings", bearer, (req, res) => {
  console.log("GET Postings!");
  console.log(req.query);

  if (req.query === undefined) {
    const errorMessage = "Empty query to get Postings from Shop!";
    console.error(errorMessage);
    res.status(400).send({ result: errorMessage });
  }

  const data1 = new Date(req.query.date_begin);
  const data2 = new Date(req.query.date_end);

  DocsPostingShop.aggregate()
    .match({ date: { $gte: data1, $lt: data2 } })
    .sort({ moment_of_changes: -1 })
    .group({ originalId: { $first: "$_id" }, _id: "$id_doc" })
    .lookup({
      from: "docspostingshops",
      localField: "originalId",
      foreignField: "_id",
      as: "original_doc"
    })
    .project({ "original_doc.positions": 0 })
    .exec((err, results) => {
      if (err) {
        console.error(err);
        res.status(400).send({ result: err });
      } else {
        res.status(200).send({
          result: results.map(item => item.original_doc[0])
        });
      }
    });
});

export default router;
