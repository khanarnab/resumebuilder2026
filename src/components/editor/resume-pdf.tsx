import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 4,
    color: "#4b5563",
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    color: "#374151",
    marginBottom: 4,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemTitle: {
    fontFamily: "Helvetica-Bold",
  },
  itemSubtitle: {
    color: "#4b5563",
  },
  itemDate: {
    color: "#6b7280",
  },
  text: {
    color: "#4b5563",
    marginTop: 2,
  },
  skills: {
    color: "#4b5563",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
  },
})

interface ResumePDFProps {
  resume: {
    contactInfo: {
      fullName?: string | null
      email?: string | null
      phone?: string | null
      location?: string | null
      linkedin?: string | null
      github?: string | null
      website?: string | null
    } | null
    summary: {
      content: string
    } | null
    experiences: Array<{
      company: string
      position: string
      location?: string | null
      startDate?: Date | null
      endDate?: Date | null
      current: boolean
      description?: string | null
    }>
    education: Array<{
      institution: string
      degree: string
      field?: string | null
      startDate?: Date | null
      endDate?: Date | null
      current: boolean
      description?: string | null
    }>
    skills: Array<{
      name: string
    }>
    projects: Array<{
      name: string
      url?: string | null
      description?: string | null
    }>
  }
}

function formatDate(date: Date | null | undefined): string {
  if (!date) return ""
  return new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export function ResumePDF({ resume }: ResumePDFProps) {
  const { contactInfo, summary, experiences, education, skills, projects } = resume

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{contactInfo?.fullName || "Your Name"}</Text>
          <View style={styles.contactRow}>
            {contactInfo?.email && <Text>{contactInfo.email}</Text>}
            {contactInfo?.phone && <Text>• {contactInfo.phone}</Text>}
            {contactInfo?.location && <Text>• {contactInfo.location}</Text>}
          </View>
          <View style={styles.contactRow}>
            {contactInfo?.linkedin && (
              <Link src={contactInfo.linkedin} style={styles.link}>LinkedIn</Link>
            )}
            {contactInfo?.github && (
              <Link src={contactInfo.github} style={styles.link}>GitHub</Link>
            )}
            {contactInfo?.website && (
              <Link src={contactInfo.website} style={styles.link}>Website</Link>
            )}
          </View>
        </View>

        {/* Summary */}
        {summary?.content && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.text}>{summary.content}</Text>
          </View>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experiences.map((exp, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{exp.position}</Text>
                  <Text style={styles.itemDate}>
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>
                  {exp.company}{exp.location && `, ${exp.location}`}
                </Text>
                {exp.description && <Text style={styles.text}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>
                    {edu.degree}{edu.field && ` in ${edu.field}`}
                  </Text>
                  <Text style={styles.itemDate}>
                    {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                {edu.description && <Text style={styles.text}>{edu.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.skills}>{skills.map(s => s.name).join(", ")}</Text>
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((project, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={styles.itemTitle}>{project.name}</Text>
                {project.url && <Text style={styles.itemSubtitle}>{project.url}</Text>}
                {project.description && <Text style={styles.text}>{project.description}</Text>}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
}