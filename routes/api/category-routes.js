const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
	// find all categories
	Category.findAll({
		include: [
			{
				model: Product,
			},
		],
	})
		.then((categorydb) => res.json(categorydb))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get("/:id", (req, res) => {
	// find one category by its `id` value
	Category.findOne({
		where: {
			id: req.params.id,
		},
		include: [
			{
				model: Product,
			},
		],
	})
		.then((categorydb) => {
			if (!categorydb) {
				res.status(404).json({ message: "No category found with this ID!" });
				return;
			}
			res.json(categorydb);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.post("/", (req, res) => {
	// create a new category
	Category.create({
		category_name: req.body.category_name,
	})
		.then((categorydb) => res.json(categorydb))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.put("/:id", (req, res) => {
	// update a category by its `id` value
	Category.update(
		{
			category_name: req.body.category_name,
		},
		{
			where: {
				id: req.params.id,
			},
		}
	)
		.then((categorydb) => {
			if (!categorydb) {
				res.status(404).json({ message: "No post found with this ID!" });
				return;
			}
			res.json(categorydb);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.delete("/:id", (req, res) => {
	// delete a category by its `id` value
	Category.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((categorydb) => {
			if (!categorydb) {
				res.status(404).json({ message: "No post found with this ID!" });
				return;
			}
			res.json(categorydb);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
