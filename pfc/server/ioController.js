export default class IOController {
    #io;
    #waitingPlayer;
    #allPlayers;

    constructor(io) {
        this.#io = io;
        this.#waitingPlayer = null;
        this.#allPlayers = new Map();

        this.#io.on('connection', (socket) => {
            if (this.#allPlayers.size >= 2) {
                socket.emit('error_message', "Le serveur est plein (2 joueurs max).");
                socket.disconnect(true);
                return;
            }

            this.#allPlayers.set(socket.id, socket);

            socket.on('recherche_adversaire', () => {
                this.#registerSocket(socket);
            });

            socket.on('disconnect', () => {
                this.#handleDisconnect(socket);
            });
        });
    }

    #registerSocket(socket) {
        socket.coup = null;
        socket.adversaire = null;

        socket.on('play', (coup) => {
            if (socket.coup) return;
            socket.coup = coup;
            const adversaire = socket.adversaire;

            if (adversaire && adversaire.coup) {
                const result = this.#determineWinner(socket.coup, adversaire.coup);
                socket.emit('result', { result: result });
                adversaire.emit('result', { result: this.#reverseResult(result) });
            } else if (adversaire) {
                socket.emit('waitingForOpponent');
            }
        });

        // REVENU À LA VERSION "LE PREMIER QUI CLIQUE GAGNE"
        socket.on('restart_game', () => {
            const adversaire = socket.adversaire;
            if (adversaire) {
                // On remet tout à zéro immédiatement
                socket.coup = null;
                adversaire.coup = null;
                
                // On prévient tout le monde
                socket.emit('game_restarted');
                adversaire.emit('game_restarted');
            }
        });

        if (this.#waitingPlayer === null) {
            this.#waitingPlayer = socket;
            socket.emit('waiting');
        } else {
            this.#waitingPlayer.adversaire = socket;
            socket.adversaire = this.#waitingPlayer;
            this.#waitingPlayer.emit('gameStart', { role: 'J1' });
            socket.emit('gameStart', { role: 'J2' });
            this.#waitingPlayer = null;
        }
    }

    #handleDisconnect(socket) {
        this.#allPlayers.delete(socket.id);
        if (this.#waitingPlayer === socket) this.#waitingPlayer = null;
        if (socket.adversaire) {
            const rest = socket.adversaire;
            rest.emit('opponentDisconnected');
            rest.adversaire = null;
            rest.coup = null;
        }
    }

    #reverseResult(res) {
        if (res === 'win') return 'lose';
        if (res === 'lose') return 'win';
        return 'egalite';
    }

    #determineWinner(c1, c2) {
        if (c1 === c2) return 'egalite';
        const win = (c1 === 'pierre' && c2 === 'ciseaux') || (c1 === 'feuille' && c2 === 'pierre') || (c1 === 'ciseaux' && c2 === 'feuille');
        return win ? 'win' : 'lose';
    }
}