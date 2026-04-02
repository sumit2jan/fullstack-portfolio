import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useState, useRef, useEffect } from "react";

const OtpModal = ({ show, handleClose, email }) => {
    const navigate = useNavigate();

    const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef([]);
    const [timer, setTimer] = useState(30);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    // Timer
    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    // OTP Input
    const handleChangeOtp = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otpArray];
        newOtp[index] = value;
        setOtpArray(newOtp);

        // Next focus
        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    // Backspace
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otpArray[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    //  Submit
    const handleVerify = async () => {
        const otp = otpArray.join("");

        console.log("EMAIL:", email);
        console.log("OTP:", otp);

        if (otp.length !== 6) {
            setStatus("Please enter complete OTP");
            return;
        }

        try {
            setLoading(true);
            setStatus("");

            await API.post("/students/verify-email", {
                email,
                otp: otp.toString(), // ensure string
            });

            setStatus("Email verified successfully!");
            
            setTimeout(() => {
                handleClose();
                navigate("/login");
            }, 1000);

        } catch (err) {
            const message = err.response?.data?.message;

            if (message === "Invalid OTP") {
                setStatus(" Wrong OTP");
            } else if (message === "OTP expired") {
                setStatus(" OTP expired");
            } else {
                setStatus(" Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    // 🔁 Resend OTP
    const handleResend = async () => {
        try {
            await API.post("/students/resend-otp", { email });

            setStatus("New OTP sent");
            setTimer(30);
            setOtpArray(["", "", "", "", "", ""]);
            inputsRef.current[0]?.focus();

        } catch {
            setStatus("Failed to resend OTP");
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Verify OTP</Modal.Title>
            </Modal.Header>

            <Modal.Body className="text-center">

                <p>Enter 6-digit OTP</p>

                {/*OTP Boxes */}
                <div className="d-flex justify-content-center gap-2 mb-3">
                    {otpArray.map((digit, index) => (
                        <Form.Control
                            key={index}
                            type="text"
                            maxLength={1}
                            value={digit}
                            ref={(el) => (inputsRef.current[index] = el)}
                            onChange={(e) =>
                                handleChangeOtp(e.target.value, index)
                            }
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            style={{
                                width: "45px",
                                height: "45px",
                                textAlign: "center",
                                fontSize: "20px"
                            }}
                        />
                    ))}
                </div>

                {/* Status */}
                {status && (
                    <div className="mb-2 text-danger">{status}</div>
                )}

                {/* Timer / Resend */}
                {timer > 0 ? (
                    <p className="text-muted">
                        Resend OTP in {timer}s
                    </p>
                ) : (
                    <Button variant="link" onClick={handleResend}>
                        Resend OTP
                    </Button>
                )}

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>

                <Button onClick={handleVerify} disabled={loading}>
                    {loading ? "Verifying..." : "Verify"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OtpModal;