interface RelatedConcept {
  concept: string;
  count: number;
}

interface ChapterAnalysis {
  chapter: string;
  zeropointMentions: string[];
  relatedConcepts: RelatedConcept[];
  keyPassages: string[];
}

interface PdfAnalysisData {
  chapters: ChapterAnalysis[];
  totalChapters: number;
  totalConcepts: number;
  mostFrequentConcepts: RelatedConcept[];
}

class PdfAnalysis {
  private data: ChapterAnalysis[];

  constructor(analysisData: ChapterAnalysis[]) {
    this.data = analysisData;
  }

  getTotalChapters(): number {
    return this.data.length;
  }

  getChapterByIndex(index: number): ChapterAnalysis | null {
    return this.data[index] || null;
  }

  getChapterByName(chapterName: string): ChapterAnalysis | null {
    return this.data.find(chapter => 
      chapter.chapter.toLowerCase().includes(chapterName.toLowerCase())
    ) || null;
  }

  getAllConcepts(): RelatedConcept[] {
    const conceptMap = new Map<string, number>();
    
    this.data.forEach(chapter => {
      chapter.relatedConcepts.forEach(concept => {
        const currentCount = conceptMap.get(concept.concept) || 0;
        conceptMap.set(concept.concept, currentCount + concept.count);
      });
    });

    return Array.from(conceptMap.entries()).map(([concept, count]) => ({
      concept,
      count
    })).sort((a, b) => b.count - a.count);
  }

  getMostFrequentConcepts(limit: number = 10): RelatedConcept[] {
    return this.getAllConcepts().slice(0, limit);
  }

  getConceptsByFrequency(minCount: number = 5): RelatedConcept[] {
    return this.getAllConcepts().filter(concept => concept.count >= minCount);
  }

  searchKeyPassages(searchTerm: string): string[] {
    const results: string[] = [];
    const term = searchTerm.toLowerCase();
    
    this.data.forEach(chapter => {
      chapter.keyPassages.forEach(passage => {
        if (passage.toLowerCase().includes(term)) {
          results.push(passage);
        }
      });
    });
    
    return results;
  }

  getChaptersWithConcept(conceptName: string): ChapterAnalysis[] {
    return this.data.filter(chapter => 
      chapter.relatedConcepts.some(concept => 
        concept.concept.toLowerCase().includes(conceptName.toLowerCase())
      )
    );
  }

  getAnalysisSummary(): PdfAnalysisData {
    const allConcepts = this.getAllConcepts();
    const totalConcepts = allConcepts.reduce((sum, concept) => sum + concept.count, 0);
    
    return {
      chapters: this.data,
      totalChapters: this.getTotalChapters(),
      totalConcepts,
      mostFrequentConcepts: this.getMostFrequentConcepts(10)
    };
  }

  getChapterTitles(): string[] {
    return this.data.map(chapter => chapter.chapter);
  }

  getConceptsByChapter(chapterIndex: number): RelatedConcept[] {
    const chapter = this.getChapterByIndex(chapterIndex);
    return chapter ? chapter.relatedConcepts : [];
  }

  getKeyPassagesByChapter(chapterIndex: number): string[] {
    const chapter = this.getChapterByIndex(chapterIndex);
    return chapter ? chapter.keyPassages : [];
  }
}

// Export the analysis data and class
export { PdfAnalysis, type ChapterAnalysis, type RelatedConcept, type PdfAnalysisData };

// Default export for easy importing
export default PdfAnalysis; 