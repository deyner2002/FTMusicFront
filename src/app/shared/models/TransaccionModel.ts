export class transaccionModel {
    public Id :number
    public TasaCambio :number
    public CantidadEnvia :number
    public CantidadRecibe :number
    public PaisOrigenId :number
    public PaisDestinoId :number
    public BeneficiarioId :number
    public UserId :string
    public UserValidadorId :string
    public UserOperadorId :string
    public Estado :number
    public ReferenciaBancaria :string
    public Comprobante :string
    public ImgComprobante : File | "";

    
}
