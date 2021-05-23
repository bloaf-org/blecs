interface GameObject {
    awake?(): void;
    start?(): void;
    update?(): void;
    fixedUpdate?(): void;
    lateUpdate?(): void;
}

export default GameObject;
