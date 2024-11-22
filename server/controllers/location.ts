import { Request, Response } from "express";
import Location from "../mongoose/schemas/location"
const getAll = async (req: Request, res: Response) => {
    const locations = await Location.find();


    res.json({
        message: "Locations retrieved succesfully",
        items: locations
    })
}

const create = async (req: Request, res: Response) => {
    const { name } = req.matchedData;

    const location = new Location({ name });

    await location.save();
    res.status(201).json({
        message: "Location created succesfully",
        item: location
    })
}


const update = async (req: Request, res: Response) => {
    const { name } = req.matchedData;
    const { id } = req.params
    const location = await Location.findById(id);

    if (!location) {
        res.status(404).json({
            message: "Location not found"
        })
        return
    }
    location.name = name;
    await location.save();

    res.json({
        message: "Location updated succesfully",
        item: location
    })
}

const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    const location = await Location.findById(id);

    if (!location) {
        res.status(404).json({
            message: "Location not found"
        })
        return
    }

    await location.deleteOne();

    res.json({
        message: "Location deleted succesfully"
    })
}

export default {
    getAll,
    create,
    update,
    remove
}