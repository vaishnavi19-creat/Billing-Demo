import { Router } from "express";

export class UnitTypeRouter {

    public router:Router;

    constructor() {

        this.router = Router();

    }

}









// import { Router } from 'express';
// import { UnitTypeService } from '../services/UnitType.service';

// const router = Router();
// const unitTypeService = new UnitTypeService();

// router.post('/', async (req, res) => {
//     try {
//         const unitType = await unitTypeService.createUnitType(req.body);
//         res.status(201).json(unitType);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// router.get('/', async (req, res) => {
//     try {
//         const unitTypes = await unitTypeService.getAllUnitTypes();
//         res.status(200).json(unitTypes);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// router.get('/:id', async (req, res) => {
//     try {
//         const unitType = await unitTypeService.getUnitTypeById(+req.params.id);
//         if (!unitType) {
//             return res.status(404).json({ message: 'Unit type not found' });
//         }
//         res.status(200).json(unitType);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// router.put('/:id', async (req, res) => {
//     try {
//         const updatedUnitType = await unitTypeService.updateUnitType(+req.params.id, req.body);
//         if (!updatedUnitType) {
//             return res.status(404).json({ message: 'Unit type not found' });
//         }
//         res.status(200).json(updatedUnitType);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// router.delete('/:id', async (req, res) => {
//     try {
//         await unitTypeService.deleteUnitType(+req.params.id);
//         res.status(204).send();
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// export default router;
