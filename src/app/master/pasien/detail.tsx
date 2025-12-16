"use client";

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PatientsAPI } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Users,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  FileText,
  Edit3,
  Save,
  X,
  Trash2,
  ArrowLeft,
  Loader2,
  UserCircle,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function PatientDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const patientId = String(id);

  const [patient, setPatient] = React.useState<any>(null);
  const [originalPatient, setOriginalPatient] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    const loadDetail = async () => {
      try {
        const result: any = await PatientsAPI.getDetail(patientId);
        setPatient(result.data);
        setOriginalPatient(result.data);
      } finally {
        setLoading(false);
      }
    };
    loadDetail();
  }, [patientId]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name.startsWith("addresses.")) {
      const key = name.split(".")[1];
      setPatient({
        ...patient,
        addresses: {
          ...patient.addresses,
          [key]: value,
        },
      });
    } else {
      setPatient({
        ...patient,
        [name]: value,
      });
    }
  };

  const handlePhonesChange = (e: any) => {
    const value = e.target.value;
    const phonesArray = value.split(",").map((phone: string) => phone.trim()).filter((phone: string) => phone);
    setPatient({
      ...patient,
      phones: phonesArray,
    });
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await PatientsAPI.update(patientId, patient);
      toast.success("Pasien berhasil diperbarui!");
      setIsEditing(false);
      setOriginalPatient(patient);
    } catch (err) {
      toast.error("Gagal menyimpan perubahan");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setPatient(originalPatient);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      await PatientsAPI.delete(patientId);
      navigate("/master/pasien?deleted=1");
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-10 h-10 text-primary" />
            </motion.div>
            <p className="mt-4 text-muted-foreground font-medium">
              Memuat detail pasien...
            </p>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (!patient) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="text-center p-12">
          <Users className="w-16 h-16 mx-auto text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">Data tidak ditemukan</h3>
          <p className="text-muted-foreground mt-2">
            Pasien yang Anda cari tidak tersedia
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate("/master/pasien")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </Card>
      </motion.div>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === "0000-00-00") return "-";
    try {
      return new Date(dateString).toLocaleDateString("id-ID");
    } catch {
      return "-";
    }
  };

  const formatGender = (gender: string) => {
    if (gender === "L") return "Laki-laki";
    if (gender === "P") return "Perempuan";
    return "-";
  };

  const renderField = (
    label: string,
    name: string,
    value: any,
    type: string = "text",
    icon?: any
  ) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <Label className="text-sm font-medium flex items-center gap-2">
        {icon}
        {label}
      </Label>
      {isEditing ? (
        <Input
          name={name}
          value={value ?? ""}
          onChange={handleChange}
          type={type}
        />
      ) : (
        <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
          {value || "-"}
        </p>
      )}
    </motion.div>
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="shadow-sm">
        <CardHeader className="border-b">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-between items-start"
          >
            <motion.div variants={itemVariants}>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <Users className="w-6 h-6" />
                {isEditing ? "Edit Data Pasien" : "Detail Pasien"}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                NORM: <Badge variant="outline" className="font-mono">{patient.norm || "-"}</Badge>
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <Badge variant={patient.gender === "L" ? "default" : "secondary"} className="gap-1">
                <UserCircle className="w-3 h-3" />
                {formatGender(patient.gender)}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Calendar className="w-3 h-3" />
                {patient.age || 0} tahun
              </Badge>
            </motion.div>
          </motion.div>
        </CardHeader>

        <CardContent className="p-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Identitas Utama */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-primary border-b pb-2 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Identitas Utama
              </h3>
              {renderField("Nama Lengkap", "name", patient.name, "text", <Users className="w-4 h-4 text-muted-foreground" />)}
              {renderField("NIK", "nik", patient.nik, "text", <CreditCard className="w-4 h-4 text-muted-foreground" />)}
              {renderField("No. BPJS", "bpjs_number", patient.bpjs_number, "text", <CreditCard className="w-4 h-4 text-muted-foreground" />)}
              {renderField("No. IHS", "ihs_number", patient.ihs_number, "text", <FileText className="w-4 h-4 text-muted-foreground" />)}
              {renderField("Tanggal Lahir", "birth_date", patient.birth_date, "date", <Calendar className="w-4 h-4 text-muted-foreground" />)}
              {renderField("Nama Keluarga", "family_name", patient.family_name, "text", <Users className="w-4 h-4 text-muted-foreground" />)}
              {renderField("Email", "email", patient.email, "email", <Mail className="w-4 h-4 text-muted-foreground" />)}
            </motion.div>

            {/* Kontak & Alamat */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-primary border-b pb-2 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Kontak & Alamat
              </h3>

              {/* Telepon */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  Nomor Telepon
                </Label>
                {isEditing ? (
                  <Input
                    value={patient.phones?.join(", ") || ""}
                    onChange={handlePhonesChange}
                    placeholder="Pisahkan dengan koma untuk multiple nomor"
                  />
                ) : (
                  <div className="bg-muted/50 p-2 rounded">
                    {patient.phones?.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {patient.phones.map((phone: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="gap-1 text-xs">
                            <Phone className="w-3 h-3" />
                            {phone}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </div>
                )}
              </motion.div>

              {/* Alamat KTP */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <Label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  Alamat KTP
                </Label>
                {isEditing ? (
                  <Input
                    name="addresses.ktp"
                    value={patient.addresses?.ktp ?? ""}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                    {patient.addresses?.ktp || "-"}
                  </p>
                )}
              </motion.div>

              {/* Alamat Domisili */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <Label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  Alamat Domisili
                </Label>
                {isEditing ? (
                  <Input
                    name="addresses.domisili"
                    value={patient.addresses?.domisili ?? ""}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                    {patient.addresses?.domisili || "-"}
                  </p>
                )}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Informasi Audit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 pt-6 border-t"
          >
            <h3 className="text-lg font-semibold text-primary border-b pb-2 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Informasi Audit
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-muted/30 p-3 rounded-lg">
                <span className="font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  Dibuat pada:
                </span>
                <p className="text-muted-foreground mt-1">{formatDate(patient.created_at)}</p>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg">
                <span className="font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  Diperbarui pada:
                </span>
                <p className="text-muted-foreground mt-1">{formatDate(patient.updated_at)}</p>
              </div>
            </div>
          </motion.div>

          {/* ACTION BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-3 mt-8 pt-6 border-t"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" onClick={() => navigate("/master/pasien")} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Button>
            </motion.div>

            <AnimatePresence mode="wait">
              {!isEditing ? (
                <motion.div
                  key="edit"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button onClick={() => setIsEditing(true)} className="gap-2">
                    <Edit3 className="w-4 h-4" />
                    Edit Data
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="save"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex gap-3"
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button onClick={handleUpdate} disabled={saving} className="gap-2">
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Simpan Perubahan
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="secondary" onClick={handleCancel} className="gap-2">
                      <X className="w-4 h-4" />
                      Batal
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {!isEditing && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="gap-2">
                      <Trash2 className="w-4 h-4" />
                      Hapus Pasien
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2">
                        <Trash2 className="w-5 h-5 text-destructive" />
                        Hapus Data Pasien?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Tindakan ini akan menghapus semua data pasien{" "}
                        <strong>{patient.name}</strong> secara permanen. Data yang
                        sudah dihapus tidak dapat dikembalikan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel className="gap-2">
                        <X className="w-4 h-4" />
                        Batal
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Ya, Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </motion.div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}