"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { PatientsAPI } from "@/lib/api";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  FileText,
  Save,
  ArrowLeft,
  UserPlus,
  Loader2,
  UserCircle,
} from "lucide-react";

export default function CreatePatientPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    norm: "",
    nik: "",
    bpjs_number: "",
    ihs_number: "",
    gender: "",
    name: "",
    email: "",
    phones: "",
    addresses: {
      ktp: "",
      domisili: "",
    },
    birth_date: "",
    family_name: "",
  });

  const [saving, setSaving] = React.useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name.startsWith("addresses.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        addresses: {
          ...formData.addresses,
          [key]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleGenderChange = (value: string) => {
    setFormData({
      ...formData,
      gender: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Convert phones string to array
      const payload = {
        ...formData,
        phones: formData.phones
          .split(",")
          .map((phone) => phone.trim())
          .filter((phone) => phone),
      };

      await PatientsAPI.create(payload);
      toast.success("Pasien berhasil ditambahkan!");
      navigate("/master/pasien?created=1");
    } catch (err: any) {
      toast.error("Gagal menambahkan pasien");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="border-b">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 bg-primary/10 rounded-lg">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl text-primary">Tambah Pasien Baru</CardTitle>
              <p className="text-sm text-muted-foreground">
                Lengkapi form berikut untuk menambahkan data pasien baru
              </p>
            </div>
          </motion.div>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Identitas Utama */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-primary border-b pb-2 flex items-center gap-2">
                  <UserCircle className="h-5 w-5" />
                  Identitas Utama
                </h3>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    NORM <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    name="norm"
                    value={formData.norm}
                    onChange={handleChange}
                    placeholder="Nomor Rekam Medis"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    Nama Lengkap <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nama lengkap pasien"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    NIK
                  </Label>
                  <Input
                    name="nik"
                    value={formData.nik}
                    onChange={handleChange}
                    placeholder="Nomor Induk Kependudukan"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    No. BPJS
                  </Label>
                  <Input
                    name="bpjs_number"
                    value={formData.bpjs_number}
                    onChange={handleChange}
                    placeholder="Nomor BPJS"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    No. IHS
                  </Label>
                  <Input
                    name="ihs_number"
                    value={formData.ihs_number}
                    onChange={handleChange}
                    placeholder="Nomor IHS"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    Jenis Kelamin <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.gender} onValueChange={handleGenderChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">Laki-laki</SelectItem>
                      <SelectItem value="P">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>

              {/* Data Tambahan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-primary border-b pb-2 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Data Tambahan
                </h3>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    Tanggal Lahir
                  </Label>
                  <Input
                    name="birth_date"
                    type="date"
                    value={formData.birth_date}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    Nama Keluarga
                  </Label>
                  <Input
                    name="family_name"
                    value={formData.family_name}
                    onChange={handleChange}
                    placeholder="Nama keluarga/ayah/ibu"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email
                  </Label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alamat@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    Nomor Telepon
                  </Label>
                  <Input
                    name="phones"
                    value={formData.phones}
                    onChange={handleChange}
                    placeholder="Pisahkan dengan koma untuk multiple nomor"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    Alamat KTP
                  </Label>
                  <Input
                    name="addresses.ktp"
                    value={formData.addresses.ktp}
                    onChange={handleChange}
                    placeholder="Alamat sesuai KTP"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    Alamat Domisili
                  </Label>
                  <Input
                    name="addresses.domisili"
                    value={formData.addresses.domisili}
                    onChange={handleChange}
                    placeholder="Alamat tempat tinggal saat ini"
                  />
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-3 pt-6 border-t"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/master/pasien")}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Kembali
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Simpan Pasien
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}