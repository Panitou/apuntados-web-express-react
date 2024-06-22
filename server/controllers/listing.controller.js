import Listing from "../models/listing.mode.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Apuntes no encontrados"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "Solo puedes eliminar uno"));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Apunte eliminado");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Apunte no encontrado"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Valor por defecto de 10 si limit no está definido
    const startIndex = parseInt(req.query.startIndex) || 0;

    const searchTerm = req.query.searchTerm || "";
    const semester = req.query.semester || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    // Construir el objeto de búsqueda dinámicamente
    const searchCriteria = {};
    if (searchTerm) {
      searchCriteria.name = { $regex: searchTerm, $options: "i" };
    }
    if (semester) {
      searchCriteria.semester = semester;
    }

    const listings = await Listing.find(searchCriteria)
      .sort({ [sort]: order === "desc" ? -1 : 1 })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
