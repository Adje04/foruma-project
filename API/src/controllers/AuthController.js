import bcrypt from "bcrypt";
import User from "../models/User.js";
import { OtpCode } from "../models/OtpCode.js";
import { sendOtpEmail } from "../services/emailServices.js";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

dotenv.config()


export const register = async (req, res) => {

    const { name, email, password, passwordConfirm } = req.body;
    const avatar = req.file ? req.file.path : null;


    if (!password) {
        return res.status(400).json({ message: 'Le mot de passe est requis' });
    }
    if(password.length < 8) {
        return res.status(400).json({ message: 'Le mot de passe doit avoir au moins 8 caractères' });
    }
    if (password !== passwordConfirm) {
        return res.status(400).json({ message: 'Les mots de passe ne correspondent pas' });
    }

    if(name.length < 6) {
        return res.status(400).json({ message: 'Le nom doit avoir au moins 6 caractères' });
    }

    const uniqueEmail = await User.findOne({ email });
    if(uniqueEmail) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    try {
        const user = new User({ name, email, password: passwordHash, avatar });
        await user.save();

        const otpCode = Math.floor(100000 + Math.random() * 900000);
        await OtpCode.create({ email, code: otpCode });

        sendOtpEmail(email, otpCode);

        res.status(201)
            .json({
                success: true,
                message: "inscription réussie",
            });
    } catch (err) {
      
        res.status(500)
            .json({
                success: false,
                message: "une erreur de source inattendue s'est produite",
                error: err.message
            });

    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    const secret = process.env.JWT_SECRET
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, secret, {
            expiresIn: '1y',
        });

        res.status(200).json({
            success: true,
            data: user,
            message: 'Connexion réussie.',
            token,
            isAdmin: user.isAdmin,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};


export async function logout(req, res) {
    try {

        res.status(200).json({ success: true, message: 'Utilisateur déconnecté.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};


export const verifyOtpCode = async (req, res) => {
    const { email, code } = req.body;

    try {
        const otp = await OtpCode.findOne({ email });

        if (!otp) {
            return res.status(400).json({ message: 'email est invalide.' });
        }

        if (code !== otp.code) {
            return res.status(400).json({ message: 'Code OTP invalide.' });
        }

        await otp.deleteOne();

        const user = await User.findOne({ email });
        if (user.isAdmin) {
            res.status(200).json({
                success: true,
                message: 'OTP vérifié avec succès, redirection vers le tableau de bord admin.', redirectUrl: '/dashboard'
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'OTP vérifié avec succès, redirection vers le tableau de bord utilisateur.', redirectUrl: '/userDashboard'
            });
        }

    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
}


export const verifyEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email, });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const otpCode = Math.floor(100000 + Math.random() * 900000);
        await OtpCode.create({ email, code: otpCode });

        sendOtpEmail(email, otpCode);

        res.status(200).json({ success: true, data: user, message: "Un code de confirmation a été envoyé à votre adresse email." });
    } catch (err) {

        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};


export const resetPassword = async (req, res) => {
    const { id } = req.params
    const { password, passwordConfirm } = req.body;

    if (password !== passwordConfirm) {
        console.log(`password ${password} et ${passwordConfirm}`);
        return res.status(400).json({
            success: false,
            message: "Les mots de passe ne correspondent pas."
        });
    }

    try {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await User.findByIdAndUpdate({ _id: id }, { password: passwordHash });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(201).json({
            success: true,
            message: "Mot de passe réinitialisé avec succès."
        });
    } catch (error) {

        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }

};






