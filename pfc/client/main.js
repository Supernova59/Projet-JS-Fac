import { io } from 'socket.io-client';
import './style.css';

const socket = io();

const homeScreen = document.getElementById('home');
const lobbyScreen = document.getElementById('lobby');
const gameScreen = document.getElementById('game-area');
const resultArea = document.getElementById('result-area');
const btnStart = document.getElementById('btn-start');
const btnRestart = document.getElementById('btn-restart');
const statusMessage = document.getElementById('status');
const finalResultText = document.getElementById('final-result');
const gameButtons = document.querySelectorAll('.choices .btn'); 

btnStart.addEventListener('click', () => {
    homeScreen.classList.add('hidden');
    lobbyScreen.classList.remove('hidden');
    socket.emit('recherche_adversaire');
});

btnRestart.addEventListener('click', () => {
    socket.emit('restart_game');
});

socket.on('error_message', (msg) => {
    alert(msg);
});

socket.on('opponentDisconnected', () => {
    alert("L'adversaire s'est déconnecté. Retour au lobby.");
    resetInterface();
});

socket.on('waiting', () => {
    statusMessage.textContent = "En attente d'un adversaire...";
});

socket.on('gameStart', () => {
    lobbyScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
});

socket.on('result', (payload) => {
    let text = payload.result === 'win' ? "Gagné" : payload.result === 'lose' ? "Perdu" : "Égalité";
    finalResultText.textContent = `Résultat : ${text}`;
    resultArea.classList.remove('hidden');
});
socket.on('game_restarted', () => {
    resultArea.classList.add('hidden');
    gameButtons.forEach(btn => {
        btn.classList.remove('disabled', 'hidden');
        btn.disabled = false;
    });
    statusMessage.textContent = "Nouvelle partie ! À vous de jouer !";
});

gameButtons.forEach(button => {
    button.addEventListener('click', () => {
        const coup = button.id.replace('btn-', '').toLowerCase(); 
        gameButtons.forEach(btn => {
            btn.classList.add('disabled');
            btn.disabled = true;
            if (btn !== button) btn.classList.add('hidden');
        });
        socket.emit('play', coup); 
    });
});

function resetInterface() {
    gameScreen.classList.add('hidden');
    resultArea.classList.add('hidden');
    lobbyScreen.classList.remove('hidden');
    gameButtons.forEach(btn => {
        btn.classList.remove('disabled', 'hidden');
        btn.disabled = false;
    });
}